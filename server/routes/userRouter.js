const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', 
userController.getPeople, 
(req, res, next) => {
  return res.status(200).json(res.locals.allPeople);
});

router.put('/', userController.assignTask, (req, res) => {
  return res.status(200).json('Assigned task to user');
});


module.exports = router;
