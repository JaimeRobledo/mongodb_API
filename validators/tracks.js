//Esto es otro middleware, un validador

const { check } = require("express-validator")
const {validateResults} = require("../utils/handleValidation.js")
const validatorCreateItem = [
    check("name").exists().notEmpty(),
    check("album").exists().notEmpty(),
    check("cover").exists().notEmpty(),
    check("artist").exists().notEmpty(),
    check("artist.name").exists().notEmpty(),
    check("artist.nickname").exists().notEmpty(),
    check("artist.nationality").exists().notEmpty(),
    check("duration.start").exists().isInt(),
    check("duration.end").exists().isInt(),
    check("mediaId").exists().isMongoId(),
    (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateItem }