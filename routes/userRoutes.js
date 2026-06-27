const express=require('express');
const router=express.Router();

const User=require('../model/user');
const {jwtAuthMiddleware,generateToken}=require('../jwt');

router.post('/signup',async(req,res,next)=>{

    try{
        const data=req.body;

        const newUser=new User(data);

        const response=await newUser.save();
        console.log('data saved');

        const payload={
            id:response.id
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log("Token is:",token);

        res.status(200).json({response:response,token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});
    }
})

router.post('/login',async(req,res)=>{
    try{
    const {aadharCard,password}=req.body;
    const user=await User.findOne({aadharCard:aadharCard});
    if(!user|| !(await user.comparePassword(password))){
        return res.status(401).json({error:"invalid user or passs000"});
    }

    const payload={
        id:user.id,
      //  username=user.aadharCard
    }

    const token=generateToken(payload);

    res.json({token});
}catch(err){
    console.error("")
}
})


router.get('/profile', jwtAuthMiddleware, async(req,res,next)=>{
try{
    const userData=req.user;
    console.log("userdata",userData);

    const userId=userData.id;
    const user=await user.findById(userId);

    res.status(200).json({user});
}catch(err){
    console.log(err);
    res.status(500).json({error:"Internal server errorr"});

}
})


router.put('/profile/password',jwtAuthMiddleware, async(req,res)=>{
    
    const userid=req.user;
    const {currentpassword,newpassword}=req.body;

    const user=await user.findById(userid);

    console.log("data updated");

      if(!(await user.comparePassword(currentpassword))){
        return res.status(401).json({error:"invalid user or passs000"});
    }

    user.password=newpassword;
    await user.save();

    console.log("password updated");
    res.status(200).json("password updated");


})