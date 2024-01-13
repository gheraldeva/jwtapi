import express from "express";
import 'dotenv/config'

const app = express()

const PORT = process.env.PORT

app.get('/',(err)=>{
    console.log(err)
})

app.listen(PORT , () => console.log('listening on port ' + PORT))