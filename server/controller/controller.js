let Studentdb = require('../model/studentModel');
let Companydb = require('../model/companyModel');
let Admindb = require('../model/adminModel');
let Applydb = require('../model/applyModel');

//Student
//Register new student
exports.register = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty" });
            return;
        }
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        //New Student
        if (password === cpassword) {
            const student = new Studentdb({
                sId: req.body.sId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                course: req.body.course,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                cpassword: req.body.cpassword,
                tenth: req.body.tenth,
                twelfth: req.body.twelfth,
                graduation: req.body.graduation,
                postgraduation: req.body.postgraduation,
            })
            // Token
            const token = await student.generateAuthToken();
            console.log("Student Register Token : " + token);
            // Cookies
            res.cookie("studentLogin", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true
            })
            // Save student in db
            await student
                .save(student)
                .then(data => {
                    // res.send(data);
                    res.redirect('/');
                    console.log('User Registered Successfully!!');
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message || "Some error occured while creating a create operation" });
                });
        } else {
            res.send('Password and Confirm Password not match');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

//Login student
exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const student = await Studentdb.findOne({ email: email });
        // Check passwords
        if (student.password === password) {
            // Token
            const token = await student.generateAuthToken();
            // Cookies 
            res.cookie("studentLogin", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true,
            })
            res.redirect('/');
        } else {
            res.status(404).send("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("Invalid credentials");
        console.log(err);
    }
}

//Get all students or retrieve a single student
exports.getStudents = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Studentdb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found user with id:", id });
            } else {
                res.send(data);
            }
        })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving user with id:", id });
            })
    } else {
        Studentdb.find()
            .then(student => {
                res.send(student);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving student info" });
            });
    }
}

//Update Student
exports.updateStudent = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" })
    }
    const id = req.params.id;
    console.log(id);
    Studentdb.findByIdAndUpdate(id, { isPlaced: "true" }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update student with ${id}` })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating student info" });
        })
}

//Delete Student
exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        Studentdb.findByIdAndDelete(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: `Cannot Delete with id ${id}` })
                } else {
                    res.send({
                        message: "Student was deleted successfully!"
                    })
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Student with id=" + id
                });
            });
    } catch (err) {
        res.status(400).send("Could not delete Student");
        console.log(err);
    }
}


//Admin
//Admin Register
exports.adminRegister = async (req, res) => {
    try {
        //validate request
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty!" });
            return;
        }
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        // New User 
        if (password === cpassword) {
            const admin = new Admindb({
                email: req.body.email,
                password: req.body.password,
                cpassword: req.body.cpassword
            })
            // Token 
            const token = await admin.generateAuthToken();
            console.log("Admin Register Token : " + token);
            // Cookies .
            res.cookie("adminLogin", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true
            })
            //save use in db
            await admin
                .save(admin)
                .then(data => {
                    // res.send(data);
                    res.redirect('admin-login');
                    console.log('Admin Registered Successfully!!');
                })
                .catch((err) => {
                    res.status(500).send({ message: err.message || "Some error occured while creating a create operation" });
                });
        } else {
            res.send('Password and Confirm Password not match');
        }
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

// Admin Login 
exports.adminLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const admin = await Admindb.findOne({ email: email });
        // Check Passwords 
        if (admin.password === password) {
            // Token
            const token = await admin.generateAuthToken();
            // console.log("User Login Token : "+token);
            // Cookies 
            res.cookie("adminLogin", token, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //expires in one day
                httpOnly: true,
            })
            res.redirect("dashboard");
        } else {
            res.status(404).send("Password and email not match")
        }
    } catch (err) {
        res.status(400).send("Invalid Credentials " + err);
        console.log(err);
    }
}

//Get admin
exports.getAdmin = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Admindb.findById(id).then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found admin with id:", id });
            } else {
                res.send(data);
            }
        })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving admin with id:", id });
            })
    } else {
        Admindb.find()
            .then(admin => {
                res.send(admin);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving admin info" });
            });
    }
}

//Company
//Add Company
exports.addCompany = async (req, res) => {
    try {
        //validate request
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty!" });
            return;
        }
        // New Company 
        const company = new Companydb({
            companyName: req.body.companyName,
            companyDesc: req.body.companyDesc,
            role: req.body.role,
            salary: req.body.salary,
            location: req.body.location,
            interviewDate: req.body.interviewDate
        })
        //save use in db
        await company
            .save(company)
            .then(data => {
                // res.send(data);
                res.redirect('/add-company');
                console.log('Company Added Successfully!!');
            })
            .catch((err) => {
                res.status(500).send({ message: err.message || "Some error occured while creating a create operation" });
            });
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

//Get all companies
exports.allCompanies = async (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Companydb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not found company with id:", id })
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving company with id:", id });
            })
    } else {
        Companydb.find()
            .then(company => {
                res.send(company);
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving company Information" });
            });
    }
}

// Update Company 
exports.updateCompany = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update cannot be empty" })
    }
    const id = req.params.id;
    console.log(id);
    Companydb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update company with ${id}` })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating company info" });
        })
}

//Apply
//Add Apply
exports.addApply = async (req, res) => {
    try {
        //validate request
        if (!req.body) {
            res.status(400).send({ message: "Content cannot be empty!" });
            return;
        }
        const sId = req.body.sId;
        const id = req.body.id;
        // New Application 
        const apply = new Applydb({
            applicant: req.body.sId,
            companies: req.body.id
        })
        //save use in db
        await apply
            .save(apply)
            .then(data => {
                // res.send(data);
                res.redirect('/');
                console.log('Application Added Successfully!!');
            })
            .catch((err) => {
                res.status(500).send({ message: err.message || "Some error occured while creating a create operation" });
            });
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
}

//Get student application list
exports.getApply = (req, res) => {
    Applydb.
        find().
        populate({ path: 'applicant', select: '_id sId firstName lastName course email' }).
        populate({ path: 'companies', select: '_id companyName role' }).
        exec((err, apply) => {
            if (err) {
                return res.status(400).send({
                    err: "Failed to save your order"
                })
            }

            res.send(apply)
        });
}