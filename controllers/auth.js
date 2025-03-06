const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword.js")
const usersModel = require("../models/users.js")
const {tokenSign} = require("../utils/handleJwt.js")

const loginCtrl = async (req, res) => {
    req = matchedData(req)
    const dataUser = await usersModel.findOne({email: req.email})
    if (!dataUser) return res.status(404).send({error: "User not found"})
    const passwordMatch = await compare(req.password, dataUser.password)
    if (!passwordMatch) return res.status(403).send({error: "Invalid password"})
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send(data)
}

const registerCtrl = async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = {...req, password} // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send(data)
}

const getItem = async (req, res) => {
    const data = await usersModel.find()
    res.send(data)
}

module.exports = { registerCtrl, loginCtrl, getItem }
