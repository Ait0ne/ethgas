if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()    
} 


const USER = <string>process.env.DB_USER
const PASSWORD = <string>process.env.DB_PASSWORD
const DB = <string>process.env.DB_NAME

console.log()


export const config = {
    HOST: "localhost",
    USER: USER,
    PASSWORD: PASSWORD,
    DB: DB,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };