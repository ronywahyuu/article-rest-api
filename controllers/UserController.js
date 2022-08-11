import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

export const all = async (req, res, next) => {
    try {
        const allUser = await User.find()
        // const {password, ...data} = allUser.data
        // console.log(req.cookies.access_token)
        res.json({
            data: allUser
        })
    } catch (err) {
        next(err)
    }
}


export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const storeUser = new User({ ...req.body, _id : mongoose.Types.ObjectId(), password: hash });

        await storeUser.save()
        res.json({
            msg: "Register Success",
            // status: res.status
        })
    } catch (err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        
        
        if (!user) return res.json({ success: false, msg: "Wrong username or password " })
        
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) return res.json({ success: false, msg: "Wrong username or password" });
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200)


        // console.log(token)
        const {password, ...data} = user._doc

        res.json({
            status: 200,
            msg: "Sign in Success",
            
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
}