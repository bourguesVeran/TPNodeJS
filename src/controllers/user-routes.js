const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const md5 = require('md5');

router.get('/', (req, res) => {
  res.send(userRepository.getUsers())
});

router.get('/:id', (req, res) => {
  const foundUser = userRepository.getUserById(req.params.id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/', (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: md5(req.body.password),
  };

  userRepository.createUser(user);
  res.status(201).end();
});

exports.initializeRoutes = function() {
  return router;
}
