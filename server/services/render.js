const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { response } = require('express');

/* Home route and Login Register */
exports.homeRoute = (req, res) => {
    res.render('index', { title: 'Placement Adda | SIESCOMS', req: req });
}

exports.login = (req, res) => {
    res.render('login', { title: 'Login', req: req });
}

exports.register = async (req, res) => {
    res.render("register", { title: 'Register', req: req });
}

exports.logout = async (req, res) => {
    try {
        //Log out from all devices
        req.student.tokens = [];
        res.clearCookie("studentLogin");
        console.log("Logged out successfully");
        await req.student.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.student = async (req, res) => {
    try {
        // Make a get request to /api/student  
        axios.get(`${process.env.HOST}/api/student`)
            .then(Data => {
                res.render('student', {
                    db: Data.data,
                    req: req
                });
            })
    } catch (err) {
        res.send(err);
    }
}

/* Admin */

exports.adminLogin = (req, res) => {
    res.render('admin-login', { title: 'Admin Login', req: req });
}

exports.adminRegister = (req, res) => {
    res.render('admin-register', { title: 'Admin Register', req: req });
}

exports.adminLogout = async (req, res) => {
    try {
        // Logout from all devices 
        req.admin.tokens = [];

        res.clearCookie("adminLogin");
        console.log("Admin Logout Successfully!!");
        await req.admin.save();
        res.redirect("/");
    } catch (err) {
        res.status(500).send(err)
    }
}

/* Placement */

exports.placement = (req, res) => {
    res.render('placement', { title: 'Placement', req: req });
}

exports.companies = (req, res) => {
    try {
        // Make a get request to /api/company  
        axios.get(`${process.env.HOST}/api/company`, { params: { id: req.query.id } })
            .then(response => {
                res.render('companies', {
                    title: 'Companies',
                    page_name: 'companies',
                    company: response.data,
                    req: req
                });
            })
    } catch (err) {
        res.send(err);
    }
}

exports.companyProfile = (req, res) => {
    try {
        // Make a get request to /api/company  
        axios.get(`${process.env.HOST}/api/company`, { params: { id: req.query.id } })
            .then(response => {
                res.render('company-profile', {
                    title: 'Company Profile',
                    page_name: 'company-profile',
                    company: response.data,
                    req: req
                });
            })
    } catch (err) {
        res.send(err);
    }
}
/* Prepare */

exports.aptitude = (req, res) => {
    res.render('aptitude', { title: 'Aptitude', req: req });
}

exports.programming = (req, res) => {
    res.render('programming', { title: 'Programming', req: req });
}

// ----------------------------------------------------------------------
// Admin Dashboard 
exports.adminDashboard = async (req, res) => {
    const totalStudents = async () => {
        let res = await axios.get(`${process.env.HOST}/api/student`)
        return res.data.length;
    }
    const totalCompanies = async () => {
        let res = await axios.get(`${process.env.HOST}/api/company`)
        return res.data.length;
    }

    res.render('dashboard', {
        title: 'Admin - Dashboard',
        page_name: 'dashboard',
        totalStudents: await totalStudents(),
        totalCompanies: await totalCompanies()
    });
}
exports.addCompany = (req, res) => {
    // Make a get request to /api/company  
    axios.get(`${process.env.HOST}/api/company`)
        .then(response => {
            res.render('add-company', {
                title: 'Admin - Add company',
                page_name: 'add-company',
                company: response.data
            });
        })
}
exports.updateCompany = (req, res) => {
    // Make a get request to /api/company  
    axios.get(`${process.env.HOST}/api/company`, { params: { id: req.query.id } })
        .then(companyData => {
            res.render('update-company', {
                title: 'Admin - Update company',
                page_name: 'update-company',
                company_id: uuidv4(),
                company: companyData.data
            });
        })
}
exports.editCompany = (req, res) => {
    // Make a get request to /api/company  
    axios.get(`${process.env.HOST}/api/company`, { params: { id: req.query.id } })
        .then(companyData => {
            res.render('edit-company', {
                title: 'Admin - Edit company',
                page_name: 'edit-company',
                company_id: uuidv4(),
                company: companyData.data
            });
        })
}
exports.manageStudents = (req, res) => {
    // Make a get request to /api/student  
    axios.get(`${process.env.HOST}/api/student`)
        .then(response => {
            res.render('manage-students', {
                title: 'Admin - Manage Students',
                page_name: 'manage-students',
                student: response.data
            });
        })
}
exports.studentApplications = (req, res) => {
    // Make a get request to /api/apply
    axios.get(`${process.env.HOST}/api/apply`)
        .then(response => {
            res.render('student-applications', {
                title: 'Admin - Student Applications',
                page_name: 'student-applications',
                apply: response.data
            });
        })
}

/* Miscellaneous */

exports.under_progress = (req, res) => {
    res.render('under_progress', { title: 'Under Progress', req: req });
}

exports.credits = (req, res) => {
    res.render('credits', { title: 'Credits', req: req });
}