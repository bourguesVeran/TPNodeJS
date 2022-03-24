const express = require('express');
const cors = require('cors')
const { initializeRoutes } = require('./routes');
const app = express();
const port = 3000;
const { DateTime } = require('luxon');

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  const begin = new DateTime(new Date());

  res.on('finish', () => {
    const end = new DateTime(new Date());
    const requestDurationMs = end.diff(begin).toMillis();

    console.log(`[${begin.toString()}] - [${req.method} ${req.path}] - [Duration: ${requestDurationMs}ms]`);
  })
  next();
});

app.use(initializeRoutes());

app.use((err, req, res) => {
  res.status(500).send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});