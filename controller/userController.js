import userService from "../service/userService.js";

const register = async(req,res,next)=> {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next)=> {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req,res,next)=> {
    try {
        const username = req.body.username
        const result = await userService.get(username)        
        res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const logout = async(req,res,next)=> {
    try {
        await userService.logout(req.user.username)
        res.status(200).json({
            data : "Sukses LOGOUT"
        })
    } catch (error) {
        next(error)
    }
}

const update = async (req,res,next) => {
    try {
        const username = req.user.username

        const request = req.body
        const result  = await userService.update(request,username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const remove = async (req,res,next) => {
    try {
        const request = req.body
        const username = request.username
        await userService.remove(request , username)
        res.status(200).json({
            data : "user deleted"
        })
    } catch (error) {
        next(error)
    }
}


export default {register,login,get,logout,update,remove}