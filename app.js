const express = require('express');
const app = express();
 const internshipRoutes = require ('./api/routes/internships')

app.use('/internships', internshipRoutes);

module.exports = app;