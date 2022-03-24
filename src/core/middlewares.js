const express = require('express');
const { DateTime } = require('luxon');
const cors = require('cors');

const initJsonHandlerMiddlware = (app) => app.use(express.json());

const initCorsMiddlware = (app) => app.use(cors());

const initLoggerMiddlware = (app) => {
  app.use((req, res, next) => {
    const begin = new DateTime(new Date());

    res.on('finish', () => {
      const end = new DateTime(new Date());
      const requestDurationMs = end.diff(begin).toMillis();

      console.log(`[${begin.toString()}] - [${req.method} ${req.baseUrl || req.path}] - [Duration: ${requestDurationMs}ms]`);
    })
    next();
  });
};

exports.initializeConfigMiddlewares = (app) => {
  initJsonHandlerMiddlware(app);
  initCorsMiddlware(app);
  initLoggerMiddlware(app);
}

exports.initializeErrorMiddlwares = (app) => {
  app.use((err, req, res, next) => {
    res.status(500).send(err.message);
  });
}
