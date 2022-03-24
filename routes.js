const express = require('express');
const router = express.Router();
const userRepository = require('./user-repository');

router.get('/users', (req, res) => {
  res.send(userRepository.getUsers())
});

router.get('/users/:id', (req, res) => {
  const foundUser = userRepository.getUserById(req.params.id);

  if (!foundUser) {
    throw new Error('User not found');
  }

  res.send(foundUser);
});

router.post('/users', (req, res) => {
  userRepository.createUser(req.body);
  res.status(201).end();
});

exports.initializeRoutes = function() {
  return router;
}
