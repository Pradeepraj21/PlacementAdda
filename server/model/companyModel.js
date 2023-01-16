const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

let companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    companyDesc: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
    },
    salary: {
        type: String
    },
    location: {
        type: String
    },
    interviewDate: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// exporting

const Company = mongoose.model("Company", companySchema);

module.exports = Company;