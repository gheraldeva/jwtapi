import { prisma } from '../config/database.js'

export const authMiddleware = async(req, res, next) => {
    const header = req.get('Authorization')
    const token = header && header.split(" ")[1]
    console.log(token);
    if(!token) {
        res.status(401).json({
            errors : "Token gaada cuii"
        }).end()
    }else{
        const user = await prisma.user.findFirst({
            where: {
                token : token
            }
        })
        console.log(user);
        if(!user) {
            res.status(401).json({
                errors : "User not found"
            })
        }else{
            req.user = user
            next()
        }
    }

}