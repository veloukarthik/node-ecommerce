const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: [String],
        required: true,
        index: true
    },
    phone: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    gender:{
        type:String,
    },
    address:{
        type:[String],
    },
    token:{
        type:String,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('users', User);