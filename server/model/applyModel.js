const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

let applySchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    companies: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    }
})

// exporting

const Apply = mongoose.model("Apply", applySchema);

module.exports = Apply;