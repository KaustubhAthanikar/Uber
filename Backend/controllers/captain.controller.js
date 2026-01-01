const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");

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