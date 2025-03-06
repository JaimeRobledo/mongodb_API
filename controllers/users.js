const userModel= require('../models/users.js')

const createItem = async (req, res) => {
    const result = await userModel.create(req.body)
    console.log("recurso creado", result)
    res.status(201).json(result)
}

const getItem = async (req, res) => {
    const result = await userModel.find()
    console.log("recurso encontrado", result)
    res.status(201).json(result)
}

const getItemByID = async (req, res) => {
    const result = await userModel.findById(req.params.id)
    console.log("recurso encontrado", result)
    res.status(201).json(result)
}

const deleteByID = async (req, res) => {
    const result = await userModel.findByIdAndDelete(req.params.id)
    console.log("recurso eliminado", result)
    res.status(201).json(result)
}

//finbyIdandReplace

const updateByID = async (req, res) => {
    console.log(req.body)
    
        const id = req.params.id;
        const data = await userModel.findOneAndReplace(
            {_id: id}, 
            req.body, {returnDocument: 'after'});
        res.json(data)
    
}

module.exports = {createItem, getItem, getItemByID, deleteByID, updateByID}