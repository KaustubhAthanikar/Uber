const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistToken = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    if(!token){
        return res.status(401).json({message:"Access denied. No token provided."});
    }

    const isBlacklisted = await blacklistToken.findOne({token:token});

    if(isBlacklisted){
        return  res.status(401).json({message:"Unauthorized."});
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();

    }catch(err){
        return res.status(400).json({message:"Unauthorized."});
    }
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie("token");
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    await blacklistToken.create({token});
    res.status(200).json({message:"Logged out successfully"});
}