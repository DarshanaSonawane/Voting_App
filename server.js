const express=require('express');
require('dotenv').config();

const bodyParser=require('body-parser');

const app=express();

app.get('/get',(req,res)=>{
    res.send("hello express");
})

app.listen(3000,()=>{
console.log("server running on 3000");
})