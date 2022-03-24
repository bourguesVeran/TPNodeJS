const userRepository = require('./user-repository');
const express = require("express");
const router = express.Router();

router.get('/users', (req, res) => {    
    res.status(200).send(userRepository.getUsers());
})

router.get('/users/:id', (req, res) => { /* Get one user with ID */
    res.status(200).send(userRepository.getUserByID(req.params.id));
})

router.get('/users/:firstName', (req, res) => {/* Get one user with firstname */    
    res.status(200).send(userRepository.getUserByFirstname(req.params.firstName));
})

router.post('/users', (req, res) => {/* Post create an user */
    userRepository.createUser(req.body);
    res.status(201).send("User created");
})

router.put('/users/:id', (req, res) => {/* Insert modify an user */
    userRepository.modifyUser(req.params.id, req.body)
    res.status(201).send(`User at ID ${req.params.id} have been modified`);
})

router.delete('/users/:id', (req, res) => {/* Delete an user */
    userRepository.deleteUser(req.params.id);
    res.status(200).send(`User at ID ${req.params.id} have been removed`);
})

module.exports = router;