const express = require("express")
const {authMiddleware} = require("../middleware/authMiddleware.js")
const {rolUser} = require("../middleware/rol.js")
const { validatorRegister, validatorLogin } = require("../validators/auth")
const { registerCtrl, loginCtrl, getItem } = require("../controllers/auth")

const router = express.Router()
router.post("/register", validatorRegister, registerCtrl)
router.post("/login", validatorLogin, loginCtrl) //TODO: loginCtrl en controllers
router.get("/",authMiddleware,rolUser(["admin"]), getItem)
module.exports = router