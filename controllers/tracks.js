const trackModel= require('../models/tracks.js')
const {handleHttpError} = require('../utils/handleError.js')
const { matchedData } = require('express-validator')


const createItem = async (req, res) => {
    try{
        const body = matchedData(req)
        const result = await trackModel.create(body)
        console.log("recurso creado", result)
        res.status(201).json(result)
    }
    catch(error){
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const deleteOne = async (req, res) => {
    try{
        const {id} = req.params
        const result = await trackModel.delete({_id: id})
        console.log("recurso eliminado", result)
        res.status(204).send()
    }
    catch(error){
        handleHttpError(res, 'ERROR_DELETE_ITEMS')
    }
}

const getItems = async (req, res) => {
    try{
        const result = await trackModel.find()
        console.log("recurso obtenido", result)
        res.status(200).json(result)
    }
    catch(error){
        handleHttpError(res, 'ERROR_GET_ITEMS')
    }
}


module.exports = { createItem, deleteOne, getItems };
