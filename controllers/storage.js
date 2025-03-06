

const storageModel= require('../models/storage.js')
const { uploadToPinata } = require( '../utils/handleUploadIPFS.js')

const createItem = async (req, res) => {
    const { body, file } = req
    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL+"/"+file.filename
    }
    const data = await storageModel.create(fileData)
    res.send(data)
}

const getItem = async (req, res) => {
    const result = await storageModel.find()
    console.log("recurso encontrado", result)
    res.status(201).json(result)
}

const getItemByID = async (req, res) => {
    const result = await storageModel.findById(req.params.id)
    console.log("recurso encontrado", result)
    res.status(201).json(result)
}

const deleteByID = async (req, res) => {
    const result = await storageModel.findByIdAndDelete(req.params.id)
    console.log("recurso eliminado", result)
    res.status(201).json(result)
}

//finbyIdandReplace

const updateByID = async (req, res) => {
    console.log(req.body)
    
        const id = req.params.id;
        const data = await storageModel.findOneAndReplace(
            {_id: id}, 
            req.body, {returnDocument: 'after'});
        res.json(data)
    
}

const uploadImage = async (req, res) => {
    try {
        const id = req.params.id
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const data = await storageModel.create({url: ipfs, filename: fileName})
        res.send(data)
    }catch(err) {
        console.log(err)
        res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
        //handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
    }
}

module.exports = {createItem, getItem, getItemByID, deleteByID, updateByID, uploadImage}