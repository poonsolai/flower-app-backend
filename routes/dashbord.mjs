import { Router } from "express";

const dashbordroute = Router()

dashbordroute.get('/dashbord', (req, res)=>{

   
    if(!req.isAuthenticated()){
        return res.status(401).send({seccess:false,message:"Login First"});
    }

    return res.send({message:"welcome",user:req.user});

});


export default dashbordroute