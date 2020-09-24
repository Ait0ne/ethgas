import {sequelize} from '../db';
import {DataTypes, Model} from 'sequelize';

export interface IPrices {
    fast: number,
    fastest: number,
    average:number,
    safeLow:number
}

export type PriceTypes = 'fast'|'fastest'|'safeLow'|'average'
export type DirectionTypes = 'lower'|'higher'

export interface IUser {
    email:string,
    threshold: number,
    type: PriceTypes,
    direction: DirectionTypes
}

export interface UserInstance extends Model<IUser>,
    IUser {}

export const User = sequelize.define<UserInstance>("User", {
    email: {
        type: DataTypes.CHAR,
        unique: true
    },
    threshold: {
        type: DataTypes.DOUBLE
    },
    type: {
        type: DataTypes.ENUM('fast', 'fastest', 'safeLow', 'average')
    },
    direction: {
        type: DataTypes.ENUM('lower', 'higher')
    }
})

