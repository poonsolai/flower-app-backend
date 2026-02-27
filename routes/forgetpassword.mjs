import { Router } from 'express';
import User from '../model/usermodel.mjs';
import { hashPassword } from '../utils/passwordhash.mjs';


const forgetpassword = Router();


forgetpassword.get('/sigin/forgetpassword/:username', async (req, res) => {
    let {username} = req.params;
    let user = await User.findOne({username:username});
    if(!user){
        return res.send({success:false,message:"Incorrect Username"});
    }
    res.cookie('user_id',user._id,{maxAge:6000*6});
    return res.send({success:true,user:user});
})


forgetpassword.patch('/sigin/forgetpassword',async (req, res)=>{
    const {password} = req.body;

    const hashpassword = hashPassword(password);

    try{
        const pass = await User.findOne({_id:req.cookies.user_id}).updateOne({password:hashpassword});
        
        return res.send({success:true,message:"password changed"});
    }catch(err){
        return res.send(err);
    }
    
});


export default forgetpassword