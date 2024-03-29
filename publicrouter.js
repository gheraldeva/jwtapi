import express from 'express'
import { authMiddleware } from './middleware/authmiddleware.js'
import userController from './controller/userController.js'
import { roleMiddleWare } from './middleware/roleMiddleware.js'

const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.use(roleMiddleWare)

userRouter.get('/api/current' , userController.get)
userRouter.patch('/api/current' , userController.update)
userRouter.delete('/api/logout' , userController.logout)
userRouter.delete('/api/current' , userController.remove)

export{userRouter}