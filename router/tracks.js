const express = require("express");
const router = express.Router();
const { validatorCreateItem } = require("../validators/tracks.js");
const { createItem, deleteOne,getItems } = require("../controllers/tracks.js");
const {apiKey} = require("../middleware/customHeader.js");

router.post("/", validatorCreateItem, apiKey, createItem);
router.delete("/:id", apiKey, deleteOne);
router.get("/", apiKey, getItems);
module.exports = router;
