const express = require('express');
const route = express.Router();

const auth = require("../middleware/auth");
const services = require('../services/render');
const controller = require('../controller/controller');

/* Student */
route.get('/', services.homeRoute);
route.get('/login', services.login);
route.get('/register', services.register);
route.get('/logout', auth.studentAuth, services.logout);
route.get('/student', auth.studentAuth, services.student);

/* Admin */
route.get('/admin-login', services.adminLogin);
route.get('/admin-register', services.adminRegister);
route.get('/admin-logout', auth.adminAuth, services.adminLogout);

/* Placement */
route.get('/placement', auth.studentAuth, services.placement);
route.get('/companies', auth.studentAuth, services.companies);
route.get('/company-profile', auth.studentAuth, services.companyProfile);

/* Prepare */
route.get('/aptitude', auth.studentAuth, services.aptitude);
route.get('/programming', auth.studentAuth, services.programming);

/* Admin Dashboard */
route.get('/dashboard', auth.adminAuth, services.adminDashboard);
route.get('/add-company', auth.adminAuth, services.addCompany);
route.get('/update-company', auth.adminAuth, services.updateCompany);
route.get('/edit-company', auth.adminAuth, services.editCompany);
route.get('/manage-students', auth.adminAuth, services.manageStudents);
route.get('/student-applications', auth.adminAuth, services.studentApplications);

/* Miscellaneous */
route.get('/under_progress', services.under_progress);
route.get('/credits', services.credits);

// ----------------------------------------------------------------------

/* Login */
route.post('/login', controller.login);
route.post('/adminLogin', controller.adminLogin);

// ----------------------------------------------------------------------

/* Student API */
route.post('/api/student', controller.register);
route.get('/api/student', controller.getStudents);
route.put('/api/student/:id', controller.updateStudent);
route.delete('/api/student/:id', controller.deleteStudent);
/* Admin API */
route.post('/api/admin', controller.adminRegister);
route.get('/api/admin', controller.getAdmin);
/* Company API */
route.post('/api/company', controller.addCompany);
route.get('/api/company', controller.allCompanies);
route.put('/api/company/:id', controller.updateCompany);
/* Application API */
route.post('/api/apply/', controller.addApply);
route.get('/api/apply/', controller.getApply);
route.post('/api/apply/:sId&:id', controller.addApply);

module.exports = route;