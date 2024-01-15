import { prisma } from "../config/database.js"
import { registerValidasi } from "../validasi/validasiuser.js"
import bcrypt from "bcrypt"
import {validate} from "../validasi/validation.js"

const register = async (req) => {
    console.log(req);
    const user = validate(registerValidasi , req)
    console.log(user);

    user.password = await bcrypt.hash(user.password , 10)

    return prisma.user.create({
        data : user,
        select:{
             username : true,
             email : true,
        }
    })
}

export default {register}