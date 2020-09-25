import fetch from 'node-fetch';
import { User, PriceTypes, IPrices, UserInstance, DirectionTypes } from '../models/user.model';
import {Op} from 'sequelize';
import nodemailer from 'nodemailer';

const ETH_API_KEY = process.env.ETH_KEY

const current_usd_prices:IPrices = {
    fast: 0,
    fastest: 0,
    average: 0,
    safeLow:0
}



const getCurrentGasPrice = () => {
    return fetch(`https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=${ETH_API_KEY}`)
    .then(response => {
        return response.json()
    })
    .then((prices:IPrices)=> {
        const {fast, fastest, average, safeLow} = prices
        return {fast:fast/10, fastest:fastest/10, average: average/10, safeLow: safeLow/10}
    })
    .catch(err => Promise.reject(err))
}

const getCurrentEthPrice = () => {
    return fetch(`https://api.coingecko.com/api/v3/coins/ethereum`)
    .then(response => response.json())
    .then(data => {
        return data.market_data.current_price.usd
    })
    .catch(err => Promise.reject(err))
}


const getETHGasPricesInUSD = () => {
    return getCurrentGasPrice()
    .then(prices => {
        return getCurrentEthPrice()
        .then((ethPrice)=> {
            current_usd_prices.fast=(prices.fast*ethPrice)/(10**9)
            current_usd_prices.fastest=(prices.fastest*ethPrice)/(10**9)
            current_usd_prices.average=(prices.average*ethPrice)/(10**9)
            current_usd_prices.safeLow=(prices.safeLow*ethPrice)/(10**9)
            return current_usd_prices
        })
    })
    .catch((err)=> {
        return Promise.reject(err)
    })
}


const getUsersForEmailCampaign = (price:number, type:PriceTypes, direction: DirectionTypes) => {
    
    return User.findAll({
        where: {
            type: type,
            threshold: {
                [direction==='lower' ? Op.gt : Op.lt]:price
            },
            direction: direction
        }
    })
    .then(users=> {
        return users
    })
    .catch((err)=> {
        return Promise.reject(err)
    })
}

const sendEmails = (userList:UserInstance[], price:number, direction: DirectionTypes) => {
    const emails:string[] = []
    if (userList.length===0) return Promise.resolve({})
    userList.forEach((user)=> {
        emails.push(user.get('email'))
    })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: "ethereumgasprice@gmail.com",
            pass: process.env.EMAIL_PASS
        }
    })
    Promise

    const msg = {
        to: emails,
        from: 'ethereumgasprice@gmail.com',
        subject: 'ETHGasPrice',
        text: `ETH Gas Price is ${direction==='lower' ? 'below': 'back above'} the selected threshold. Current price is ${price}$.`,
        html: `<p>ETH Gas Price is ${direction==='lower' ? 'below': 'back above'} the selected threshold. Current price is ${price}$.</p>`
    }

    return transporter.sendMail(msg)
}

export const notifyUsers = () => {
    getETHGasPricesInUSD()
    .then((prices:any) => {
        console.log(prices)
        Object.keys(prices).forEach((type) => {
            let userListLower: UserInstance[];
            let userListHigher: UserInstance[];

            Promise.all([getUsersForEmailCampaign(prices[type], type as PriceTypes, 'lower'), getUsersForEmailCampaign(prices[type], type as PriceTypes, 'higher')])
            .then(result => {
                userListLower=result[0]
                userListHigher=result[1]
                return Promise.all([sendEmails(userListLower, prices[type], 'lower'), sendEmails(userListHigher, prices[type], 'higher')])
            })
            .then(() => {
                userListLower.forEach(user=> {
                    user.update({direction: 'higher'})
                })
                userListHigher.forEach(user=> {
                    user.update({direction: 'lower'})
                })
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}