import { Router } from "express";
import User from '../model/usermodel.mjs';
import { hashPassword } from "../utils/passwordhash.mjs";
import passport from '../config/passport.mjs'


// create new router
const loginroute = Router();


//route 1 
loginroute.post('/signup', async (req, res)=>{

    const newuser = req.body;
    const {username, email} = newuser;
    //find the username and email
    const findusername = await User.find({username:username});
    const finduseremail = await User.find({email:email});

    //check the condition
    if(findusername.length !== 0){
        return res.json({
            success:false,
            msg:"Username Already Exist "
        })
    }
     //check the condition
    if(finduseremail.length !== 0){
        return res.json({
            success:false,
            msg:"Email Already Exist "
        })
    }
    //create a new user
    newuser.password = hashPassword(newuser.password);

    let user = await User.create(newuser);

    // send the response 
    res.status(201).json({
        success:true,
        message:" Successfully Created New Account ",
        data:user
    });
})

//route 2
loginroute.post('/signin', (req, res, next)=>{

    passport.authenticate('local', (err, user, info)=>{
        if(err) return next(err);
        if(!user){
            return res.status(401).json({
                message:info.message,
                success:false
            });
        }
        
        req.login(user, (err)=>{
            if(err) return res.status(500).json({
                success:false,
                message:"login failed.."
            })
            return res.json({
                success:true,
                message:"Login Successfull ..."
            });
        });
    })(req, res, next);
});

//Route 3

loginroute.get('/logout', (req, res)=>{

    req.logOut((err)=>{

        if(err) return res.status(500).json({
            success: false,
            message: "Logout failed"
        });
        req.session.destroy();
        res.clearCookie("connect.sid",{
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        res.json({
            message: "Logged out successfully",
            success: true
        });

    })
    
})


export default loginroute;