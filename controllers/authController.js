
const validator = require('validator')
const authService = require("../services/authService")
const errorUtils = require("../utils/errorUtils")

exports.getRegisterView = (req, res) => {
    res.render("auth/register")
}

exports.postRegister = async (req, res) => {
    const {email, password, repeatPassword, gender} = req.body

    try {

        if(!email) {
            throw Error("Email is required")
        }
        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            throw Error("Email is Invalid")
        }
        if(!password) {
            throw Error("Password is required")
        }
        if(password.length < 4) {
            throw Error("Password is too short")
        }
        if(!repeatPassword) {
            throw Error("Confirm password is required")
        }

        if (password !== repeatPassword) {
            throw Error("Passwords missmatch")
        }

        await authService.register(email, password, gender)

        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
     return errorUtils.errorResponse(res, "auth/register", err, 404);
    };


}

exports.getLoginView = (req, res) => {
    res.render("auth/login")
}

exports.postLogin = async (req, res) => {
    const { email, password } = req.body
    //TODO ERORR HANDLIN
    try {
        const token = await authService.login(req, res, email, password)
        res.cookie("auth", token)
        res.redirect("/")
    } catch (err) {
        return errorUtils.errorResponse(res, "auth/login", err, 404);;
    }
}


exports.getLogout = (req, res) => {
    res.clearCookie("auth")
    res.redirect("/")
}