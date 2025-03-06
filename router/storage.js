const express = require("express")
const router = express.Router();
//Lo moveremos a otro archivo en utils (helpers)
const { createItem, getItem, getItemByID, deleteByID, updateByID, uploadImage } = require('../controllers/storage.js');
const {uploadMiddlewareMemory, uploadMiddleware} = require("../utils/handleStorage.js")
const multer = require("multer")
const storage = multer.diskStorage({
destination:function(req, file, callback){ //Pasan argumentos automáticamente
const pathStorage = __dirname+"/../storage"
callback(null, pathStorage) //error y destination
},
filename:function(req, file, callback){ //Sobreescribimos o renombramos
//Tienen extensión jpg, pdf, mp4
const ext = file.originalname.split(".").pop() //el último valor
const filename = "file-"+Date.now()+"."+ext
callback(null, filename)
}
}) //Middleware entre la ruta y el controlador
//hasta aquí

router.post("/local", uploadMiddleware.single("image"), (req, res) => { //solo enviamos uno con .single, sino .multi
res.send("test")
})

router.post("/", uploadMiddlewareMemory.single("image"), uploadImage)

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({ error: "El archivo es demasiado grande. Máximo permitido: 5MB" });
        }
        return res.status(400).json({ error: err.message });
    }
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = router;
