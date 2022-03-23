const express = require('express')
const app = express()
const port = 3000

const userRepository = require('./user-repository');

app.use(express.json());

app.use((req, res, next) => {
    console.log(`request called at: ${new Date().toISOString()} and IP adress: ${req.ip}, duration time:`);
    next();
})

app.get('/users', (req, res) => {    
    // userRepository.getUsers();
    // res.status(200).send("All users");
    res.send(userRepository.getUsers());
})

app.get('/users/:firstName', (req, res) => {/* Get one user with firstname */
    userRepository.getUserByFirstname(req.params.firstName)
    res.status(200).send(`User ${req.params.firstName}`);
})

app.post('/users', (req, res) => {/* Post create an user */
    // userRepository.createUser(req.body);
    // res.status(200).send("User created");
    res.send(userRepository.createUser(req.body));
})

app.put('/users/:id', (req, res) => {/* Insert modify an user */
    userRepository.modifyUser(req.params.id, req.body)
    res.status(200).send(`User at ID ${req.params.id} have been modified`);
})

app.delete('/users/:id', (req, res) => {/* Delete an user */
userRepository.deleteUser(req.params.id);
    res.status(200).send(`User at ID ${req.params.id} have been removed`);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })