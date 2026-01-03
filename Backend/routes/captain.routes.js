const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 letters"),
    body('vehicle.color').notEmpty().withMessage("Vehicle color is required"),
    body('vehicle.plate').notEmpty().withMessage("Vehicle plate is required"),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage("Vehicle capacity must be at least 1"),
    body('vehicle.vehicleType').isIn(['car', 'bike', 'auto']).withMessage("Invalid vehicle type")
], captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({min:6}).withMessage("Password must be atleast 6 letters")
], captainController.loginCaptain);

router.get('/profile',authMiddleware.authCaptain, captainController.getCaptainProfile);
router.post('/logout',authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;