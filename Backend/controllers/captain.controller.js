const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");
const blacklistToken = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const hashPassword = await captainModel.hashPassword(password);
    const isCaptainExist = await captainModel.findOne({email});
    if(isCaptainExist){
        return  res.status(400).json({message:"Captain with this email already exists"});
    }
    try {
        const captain = await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });

        const token = captain.generateAuthToken();
        res.status(201).json({ message: "Captain registered successfully", captain, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const captain = await captainModel.findOne({ email }).select("+password");
        if (!captain) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = captain.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({ token, captain });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token =
            req.cookies?.token ||
            (req.headers.authorization && req.headers.authorization.split(" ")[1]);

        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }

        const existing = await blacklistToken.findOne({ token });

        if (!existing) {
            await blacklistToken.create({ token });
        }

        res.clearCookie("token");
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Logout failed" });
    }
};