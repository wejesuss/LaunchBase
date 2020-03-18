const express = require('express')
const routes = express.Router()
const admin = require('./admin')
const home = require('./home')

const { preventRepeatedLogin, registeredUsersOnly } = require("../app/middlewares/session")
const session = require("../app/controllers/session")

const { validateLogin, validateForgot } = require("../app/validators/session")

// home
routes.use("/", home)

routes.get('/users/login', preventRepeatedLogin, session.loginForm)
routes.post('/users/login', validateLogin, session.login)
routes.post('/users/logout', session.logout)

// admin
routes.use("/admin", registeredUsersOnly, admin)

// reset password /forgot
routes.get('/users/forgot-password', session.forgotForm)
// routes.get('/users/password-reset', session.resetForm)
routes.post('/users/forgot-password', validateForgot, session.forgot)
// routes.post('/users/password-reset', UserValidator.reset, session.reset)

// Alias
routes.get('/users', function (req, res) {
    return res.redirect('/users/login')
})

routes.get('/admin', function (req, res) {
    return res.redirect('/admin/recipes')
})


module.exports = routes