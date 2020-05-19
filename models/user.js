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
        default: 0
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    account: {
        accountBal: {
         type: Number,
         default: 0
        },
        accountWithdrawn: {
            type: Number,
            default: 0
        },
       accountBal: {
            type: Number,
            default: 0
       }
    }   
})



module.exports = mongoose.model('User', userSchema);