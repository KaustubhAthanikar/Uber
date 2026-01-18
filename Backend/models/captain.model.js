const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');   

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname:{
            type:String,
            required:true   
        },
        lastname:{
            type:String,
        },
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:/^\S+@\S+\.\S+$/
    },
    password:{  
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[1,'Color must be at least 1 character long']
        },
        plate:{
            type:String,
            required:true,
            unique:true,
            minlength:[1,'Plate must be at least 1 character long']
        },
        capacity:{
            type:Number,
            required:true,
            minlength:[1,'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
        }
    },
    location: {
    type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        type: [Number], // [lng, lat]
        default:[0,0]
    }
}


});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10)
}

captainSchema.index({ location: "2dsphere" });

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;
