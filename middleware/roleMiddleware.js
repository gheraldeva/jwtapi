import { ResponseError } from "../responerror.js"

export const roleMiddleWare = async (req,res,next) => {
    const user = req.user

    if(user.role == 'ADMIN'){
        next()
    }else{
        res.status(403).json({
            error : "You Have No Permissions to do the action"
        })
    }
}