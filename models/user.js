const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        default:''
    },
    lastName: {
        type: String,
        required: true,
        default:''
    },
    email: {
        type: String,
        required: true,
        default:''
    },

    password: {
        type: String,
        required: true,
        default:''
    },

    contact: {
        type: Number,
        required: true,
        default:''
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    account: {
        accountBal: {
         type: Number
        },
        accountWithdrawn: {
            type: Number
        },
       accountBal: {
            type: Number
       }
    }   
})

module.exports = mongoose.model('User', userSchema);