const jwt = require('jsonwebtoken');
let Studentdb = require('../model/studentModel');
let Companydb = require('../model/companyModel');
let Admindb = require('../model/adminModel');
let Applydb = require('../model/applyModel');

// Student Auth
exports.studentAuth = async (req, res, next) => {
    try {
        const token = req.cookies.studentLogin;
        const verifyStudent = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyStudent)

        const student = await Studentdb.findOne({ _id: verifyStudent._id })
        console.log("Student logged in: " + student.firstName);

        req.token = token;
        req.student = student;

        next();
    } catch (err) {
        // res.status(401).send("Session Expired pls login again! "+err);
        console.log("Session Expired please login again! ");
        res.redirect("/login");
    }
}


// Admin Auth
exports.adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.adminLogin;
        const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(verifyAdmin);

        const admin = await Admindb.findOne({ _id: verifyAdmin._id })
        console.log("admin Logged In: " + admin.email);

        req.token = token;
        req.admin = admin;

        next();
    } catch (err) {
        // res.status(401).send("Session Expired pls login again! "+err);
        console.log("Session Expired pls login again! ");
        res.redirect("/admin-login");
    }
}