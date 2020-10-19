import express from "express";

const app = express();

app.get("/",(req,res)=>{
    console.log("HEYY");
    res.send("HELLO PEOPLE");
})

app.listen(3000,()=>console.log("SERVER IS UP AND RUNNING"));