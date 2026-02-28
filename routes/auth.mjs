import { Router } from "express";

const authroute = Router();

authroute.get('/auth', (req, res)=>{

    if(!req.isAuthenticated()){
        return res.send({success:false,message: 'Not authenticated'})
    }
    return res.send({success:true,});
    
});

export default authroute