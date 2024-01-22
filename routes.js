import express from "express"
import userController from "./controller/userController.js"

const publicRouter = new express.Router()
publicRouter.post('/register' , userController.register)
publicRouter.post('/login' , userController.login)
publicRouter.get('/get', userController.get)

export {publicRouter}