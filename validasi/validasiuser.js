import Joi from "joi";

const registerValidasi = Joi.object({
    username: Joi.string().max(100).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    role: Joi.string().valid('USER','ADMIN'),
    token: Joi.string().max(1000).optional()
})

const loginValidasi = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(255).required(),
})

const getValidasi = Joi.string().max(100).required()

const updateValidasi = Joi.object({
    username: Joi.string().max(100).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    token: Joi.string().max(1000).optional()
})



export{registerValidasi , loginValidasi, getValidasi,updateValidasi}