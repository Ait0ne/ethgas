import {Sequelize, Op} from 'sequelize';
import {config} from './db-config';

export const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: "postgres",
    operatorsAliases: Op,
    pool: config.pool
})

console.log(sequelize)