const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

router.get('/', 
userController.getPeople, 
(req, res, next) => {
  return res.status(200).json(res.locals.allPeople);
})

module.exports = router;
