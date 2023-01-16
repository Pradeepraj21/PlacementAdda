const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

let studentSchema = new mongoose.Schema({
    sId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    gender: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email invalid");
            }
        }
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tenth: {
        type: Number,
        required: true
    },
    twelfth: {
        type: Number,
        required: true
    },
    graduation: {
        type: Number,
        required: true
    },
    postgraduation: {
        type: Number,
        required: true
    },
    isPlaced: {
        type: String,
        default: "false"
    },
    isRevoked: {
        type: String,
        default: "false"
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apply'
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generating tokens

studentSchema.methods.generateAuthToken = async function (req, res) {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        res.send("Error: " + err);
        console.log("Error Occured: " + err);
    }
}

// exporting

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;