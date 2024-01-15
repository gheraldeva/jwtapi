import Joi from "joi";

const registerValidasi = Joi.object({
    username: Joi.string().max(100).required(),
    email: Joi.string().max(255).required(),
    password: Joi.string().max(255).required(),
    token: Joi.string().max(1000).optional()
})

export{registerValidasi}