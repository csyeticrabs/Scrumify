const express = require('express');
const apiController = require('../controller/apiController');

const router = express.Router();

// get all data, when / is requested we should return all data from database
router.get('/', apiController.getTasks, (req, res, next) => {
  return res.status(200).json(res.locals.allTasks);
});

router.post('/', apiController.addTask, (req, res, next) => {
  return res.status(200).json(res.locals.newTask);
});

module.exports = router;
