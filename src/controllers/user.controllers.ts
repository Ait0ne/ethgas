import {User, PriceTypes} from '../models/user.model';
import {Request, Response} from 'express';




const createUser = async (user:{email:string, threshold: number, type: PriceTypes}): Promise<any> => {
    return User.create({...user, direction: 'lower'})
    .then(user => {
        return user
    })
    .catch(err => {
        console.log(err)
        Promise.reject(err)
    })
}



export const postUpdateOrCreate = (req: Request, res: Response) => {
    const {email, threshold, type} = req.body
    console.log(email)
    if(!email||!threshold||!type) {
        res.status(400).send()
    }
    User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if (!user) {
            const newUser = {email, threshold, type}
            createUser(newUser)
            .then((createdUser) => {
                res.status(200).send({user:createdUser})
            })
            .catch(err =>  {
                res.status(400).send()
            })
        } else {
            user.update({threshold: threshold})
            .then(updatedUser=> {
                res.status(200).send({user:updatedUser})
            })
            .catch(err => {
                res.status(400)
            })

        }
    })
}


export const postDelete = (req:Request, res: Response) => {
    const {email} = req.body
    if (!email) {
        res.status(400).send
    } else {
        User.destroy({
            where: {
                email: email
            }
        })
        .then(() => {
            res.status(200).send({ok:true})
        })
        .catch(err => {
            res.status(400).send()
        })
    }

}

