import express from "express";
import 'dotenv/config'
import { app } from "./config/app.js";

const PORT = process.env.PORT

app.listen(PORT , () => {
    console.log('listening on port ' + PORT)
})

app.get('/',(req,res)=>{
    console.log('haloo')
    res.send('yokoso')
})
app.get('/halo', (req,res) => {
    res.send("halo")
})