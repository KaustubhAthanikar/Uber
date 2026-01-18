console.log("Maps routes loaded");

const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const mapController = require('../controllers/maps.controllers');
const { query } = require('express-validator');



router.get('/get-coordinates',
    query('address').isString().isLength({ min: 1 }),
    authMiddleware.authUser,
    mapController.getCoordinates
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 1 }),
    query('destination').isString().isLength({ min: 1 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 1 }), 
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

router.get('/test', (req, res) => {
    res.send("Maps route working");
});


module.exports = router;
