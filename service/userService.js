import { prisma } from "../config/database.js"
import { getValidasi, loginValidasi, registerValidasi, updateValidasi } from "../validasi/validasiuser.js"
import bcrypt from "bcrypt"
import {validate} from "../validasi/validation.js"
import { ResponseError } from "../responerror.js"
import jwt from "jsonwebtoken"

const register = async (req) => {
    const user = validate(registerValidasi , req)

    const userSama = await prisma.user.count({
        where : {
            username : user.username
        }
    })

    if(userSama === 1){
        throw new ResponseError(401, "User is already registered")
    }

    user.password = await bcrypt.hash(user.password , 10)

    return prisma.user.create({
        data : user,
        select:{
             username : true,
             email : true,
        }
    })
}

const login = async (req, res) => {
    const loginreq = validate(loginValidasi , req)

    const user = await prisma.user.findUnique({
        where: {
            username : loginreq.username
        },
        select : {
            username : true,
            password : true,
            email: true
        }
    })

    if(!user){
        throw new ResponseError(401, "Username salah")
    }

    const passwordbener = await bcrypt.compare(
        loginreq.password,
        user.password
    )

    if(!passwordbener){
        throw new ResponseError(401, "Password salah")
    }

    const token = jwt.sign({
        username : user.username,
        email : user.email},"alpingay")

    
    
    return prisma.user.update({
        data : {
            token : token
        },
        where: {
            username : user.username
        },
        select : {
            token : true
        }
    })

}

const get = async (username) => {
    username = validate(getValidasi, username)

    const user = await prisma.user.findUnique({
        where : {
            username : username
        },
        select : {
            username : true,
            email : true,
            role: true
        }
    })

    if(!user){
        throw new ResponseError(408 , "user not found")
    }
    return user;
}

const logout = async (username) => {
    username = validate(getValidasi, username)

    const user = await prisma.user.findUnique({
        where : {
            username : username
        }
    })

    if(!user) {
        throw new ResponseError(404, "user not found")
    }

    return prisma.user.update({
        where : {
            username : username
        },data : {
            token : null
        },
        select : {
            username : true
        }
    })

}

const update = async (req,username) => {
    const user = await (updateValidasi , req)

    const totalUser = await prisma.user.count({
        where : {
            username : username
        }
    })


    if(totalUser != 1) {
        throw new ResponseError(404 , "User not found")
    }

    const data = {}
 
    if(user.username){
        data.username = user.username
    }
    if(user.email){
        data.email = user.email
    }
    if(user.password){
        data.password = await bcrypt.hash(user.password , 10)
    }

    return prisma.user.update({
        where : {
            username : username
        },
        data : data,
        select : {
            username : true,
            email : true,
            password : true
        }

    })
}

const remove = async (req,username) => {
    const user = validate(getValidasi, username)

    const totalUser = await prisma.user.count({
        where:{
            username : username
        }
    })

    if (totalUser != 1){
        throw new ResponseError(404 , "User not Found")
    }

    return prisma.user.delete({
        where : {
            username : username
        }
    })
}


export default {register,login, get,logout,update,remove}