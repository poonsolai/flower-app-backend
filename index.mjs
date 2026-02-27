import app from './server/server.mjs';
import express from 'express';
import cors from 'cors'
import ConnectDB from './config/mongodb.mjs';
import passport from './config/passport.mjs'
import session from 'express-session';
import loginroute from './routes/loginroute.mjs';
import dashbordroute from './routes/dashbord.mjs';
import authroute from './routes/auth.mjs';
import forgetpassword from './routes/forgetpassword.mjs';
import cookieParser from 'cookie-parser';

//
app.set("trust proxy",1);
//json data read panna this middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
//frontend to backend connect pannum pothu cors origin problem remove panna this middleware
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
//database connect 
ConnectDB();

// initialize the session
app.use(session({
    secret:process.env.SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    store:MongoStore.create({
        mongoUrl:process.env.DB_URL_C,
        collectionName:'sessions'
    }),
    rolling:true,
    cookie:{
        maxAge:6000*60,
        httpOnly:true,
        sameSite:'none',
        secure:true
    }
}))
// initialize the passport 
app.use(passport.initialize());
// passport la seesion panna 
app.use(passport.session());



//thani thaniya route handle panna , middleware ah use pannurom 
app.use('/api',loginroute);
app.use('/api',dashbordroute);
app.use('/api',authroute);
app.use('/api',forgetpassword);




app.get('/', (req, res)=>{
    res.send({"message":"Welcome new user .. .please login to access the dashbord"});
});