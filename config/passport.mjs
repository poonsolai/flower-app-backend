import passport from "passport";
import { Strategy as LocalStategy } from "passport-local";
import {comparePassword} from '../utils/passwordhash.mjs';
import User from "../model/usermodel.mjs";

// passport oda local stategy 
passport.use(new LocalStategy(async (username, password, done)=>{
    
    const user = await User.findOne({username:username});

    if(!user){
        return done(null, false, {message:"Incorrect Username"});
    }

    const ismatch = comparePassword(password, user.password);

    if(!ismatch){
        return done(null, false, {message:"Incorrect password"});
    }

    return done(null, user);

}));

// session la user oda id store pannurom
passport.serializeUser((user, done)=>{
    console.log(user.id);
    return done(null, user.id);
});

// session la store panna id vachi user ah find pannurom
passport.deserializeUser(async (id, done)=>{

    try{
        
        const user = await User.findById(id);
        console.log(user);
        return done(null, user);
    
    }
    catch(err){
        return done(err);
    }


});

export default passport