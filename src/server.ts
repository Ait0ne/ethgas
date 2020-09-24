import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import {router as userRoutes} from './routes/user.routes';
import {sequelize} from './db';
import {notifyUsers} from './helpers/ethGas';
import path from 'path';

const port =  process.env.PORT || 5000;


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()    
} 





sequelize.sync()
.catch(err => console.log(err))

const app = express();
app.use(cors())
app.use(json());
app.use(urlencoded({extended: true}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
})
app.use(userRoutes)

setInterval(()=>{
    notifyUsers()
}, 30000)

app.listen(port, () => {
    console.log(`server is running on port: ${port}`)
})

