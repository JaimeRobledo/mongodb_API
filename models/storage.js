const mongoose = require("mongoose")
const StorageScheme= new mongoose.Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)
module.exports = mongoose.model("storage", StorageScheme) // “storage” es el nombre de la colección en mongoDB (o de la tabla en SQL)
