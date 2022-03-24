const express = require('express');
const app = express();
const port = 3000;
const users = require('./route');

app.use(express.json());
app.use('', users);

app.use((req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(`request called at: ${new Date().toISOString()} and IP adress: ${req.ip}, duration time: , IP: ${fullUrl}`);
    next();
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })