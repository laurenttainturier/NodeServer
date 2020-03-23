const express = require('express');
const router = express.Router();

const { getAllUsers, getUserById, insertUser } = require('../Database/UserDatabase');

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const user = await getUserById(id);
    res.send(user);
});

router.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
});

router.post('/', async (req, res) => {
    const user = req.body;
    await insertUser(user);
    res.status(201).end();
});

module.exports = router;
