import mongoose from 'mongoose';
import dotenv from 'dotenv';

//global variables use panna
dotenv.config();

async function ConnectDB(){

    const DB_URL = process.env.DB_URL_C
    console.log(DB_URL)
    try{
        await mongoose.connect(DB_URL);
        console.log("Database Connected Successfully ... ");
    }catch(err){
        console.log(err);
        
    }
}

export default ConnectDB

