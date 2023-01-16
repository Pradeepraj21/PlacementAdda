const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

let adminSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

// generating tokens

adminSchema.methods.generateAuthToken = async function (req, res) {
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

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;