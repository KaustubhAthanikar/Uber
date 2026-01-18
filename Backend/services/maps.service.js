const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    try {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "YourApp/1.0"
            }
        });

        if (response.data.length > 0) {
            return {
                ltd: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon)
            };
        } else {
            throw new Error('Geocoding API error: Location not found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {
        const originCoords = await module.exports.getAddressCoordinate(origin);
        const destCoords = await module.exports.getAddressCoordinate(destination);

        const url = `https://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.ltd};${destCoords.lng},${destCoords.ltd}?overview=false`;

        const response = await axios.get(url);

        if (response.data.routes.length > 0) {
            const route = response.data.routes[0];

            return {
                distance: {
                    value: route.distance,
                    text: `${(route.distance / 1000).toFixed(2)} km`
                },
                duration: {
                    value: route.duration,
                    text: `${Math.ceil(route.duration / 60)} mins`
                }
            };
        } else {
            throw new Error('No routes found');
        }

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Input is required');
    }

    try {
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;

        const response = await axios.get(url);

        return response.data.features.map(place => ({
            name: place.properties.name,
            city: place.properties.city,
            country: place.properties.country,
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
        }));

    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports.getCaptainsInTheRadius = async (lat, lng, radiusInKm) => {
    try {
        console.log("Searching captains near:", lat, lng);

        const captains = await captainModel.find({
            status: 'active',
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [lng, lat],   // lng, lat
                        radiusInKm / 6378
                    ]
                }
            }
        });

        console.log("Matched captains:", captains.length);

        return captains;
    } catch (err) {
        console.error("Error finding captains in radius:", err);
        throw err;
    }
};


module.exports.getCaptainsInTheRadius = async (lat, lng, radiusInKm) => {
    try {

        //radius in km
        
        const captains = await captainModel.find({
            status: 'active',
            location: {
                $geoWithin: {
                    $centerSphere: [
                        [lng, lat],   
                        radiusInKm / 6378 // Earth radius in km
                    ]
                }
            }
        });
        console.log("Matched captains:", captains.length);


        return captains;
    } catch (err) {
        console.error("Error finding captains in radius:", err);
        throw err;
    }
};