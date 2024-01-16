import { prisma } from "../config/database.js"
import { getValidasi, loginValidasi, registerValidasi } from "../validasi/validasiuser.js"
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

    console.log(user.email);
    
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
            email : true
        }
    })
    console.log(user);

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

export default {register,login, get,logout}