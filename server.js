const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const apiRouter = require('./server/routes/apiRouter');

app.use(express.json());

app.use('/api', apiRouter);

//Handling invalid URLs
app.use((req, res, next) => {
  return res.status(404).send('This is not the page you are looking for');
});

// Global express error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: 'Generic message error',
  };
  const errorObj = Object.assign(defaultError, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
