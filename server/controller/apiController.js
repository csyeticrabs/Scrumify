const db = require('../database/scrumifyModel');

const apiController = {};

apiController.getTasks = async (req, res, next) => {
  try {
    const str = `SELECT * FROM tasks;`;
    const allTasks = await db.query(str);
    res.locals.allTasks = allTasks.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to retrieve all tasks',
    });
  }
};

apiController.addTask = async (req, res, next) => {
  try {
    let { _id, description, completed, worker_id } = req.body;

    if (completed === undefined) completed = false;
    if (worker_id === undefined) worker_id = null;
    const arr = [_id, description, completed, worker_id];

    const str = `INSERT INTO tasks VALUES($1, $2, $3, $4) RETURNING *;`;

    const result = await db.query(str, arr);
    console.log(result);
    res.locals.newTask = result.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to add task',
    });
  }
};

module.exports = apiController;
