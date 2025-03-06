const express = require('express');
const userRouter = express.Router();

userRouter.use(express.json());

const { createItem, getItem, getItemByID, deleteByID, updateByID } = require('../controllers/users.js');

userRouter.get('/', getItem);

userRouter.get('/:id', getItemByID);

userRouter.post('/', createItem);

userRouter.put('/:id', updateByID);

userRouter.patch('/:id', updateByID);

userRouter.delete('/:id', deleteByID);

module.exports = userRouter;