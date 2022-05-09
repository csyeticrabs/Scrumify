const db = require('../database/scrumifyModel');

const userController = {};

userController.getPeople = async (req, res, next) => {
  try {
    const str = 'SELECT * FROM people';
    const result = await db.query(str);

    res.locals.allPeople = result.rows;

    return next();

  } catch(err) {
    return next({
      log: 400,
      message: 'Failed to retrieve all users'
    })
  }
};

userController.assignTask = async (req, res, next) => {
  try {
    const { task_id, worker_id } = req.body;
    const paramsArr = [ task_id, worker_id ];
    const queryStr = 'UPDATE tasks SET worker_id = $2 WHERE _id = $1;';

    await db.query(queryStr, paramsArr);
    return next();
  } catch(err) {
    return next({
      log: 400,
      message: 'Failed to assign task to specified user'
    })
  }
};


module.exports = userController;