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
    console.log(req.body)
    let { _id, description, completed, worker_id } = req.body;
    

    if (completed === undefined) completed = false;
    if (worker_id === undefined) worker_id = null;
    const arr = [_id, description, completed, worker_id];

    const str = `INSERT INTO tasks VALUES($1, $2, $3, $4) RETURNING *;`;

    const result = await db.query(str, arr);
    res.locals.newTask = result.rows;
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to add task',
    });
  }
};

apiController.deleteTask = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const paramArr = [_id];
    const str = `DELETE FROM tasks WHERE _id = $1;`;
    await db.query(str, paramArr);
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to delete task, _id does not exist',
    });
  }
};

apiController.updateTask = async (req, res, next) => {
  try {
    //const _id = req.body._id
    //const newDesc = req.body.newDesc

    const { _id, newDesc } = req.body;
    const paramsArr = [_id, newDesc];

    //UPDATE tablename SET columnName = newValue WHERE id = req.body.id
    const str = `UPDATE tasks SET description = $2 WHERE _id = $1 RETURNING *;`;

    const result = await db.query(str, paramsArr);
    res.locals.updatedTask = result.rows[0];
    return next();
  } catch (err) {
    return next({
      log: 400,
      message: 'Failed to update task',
    });
  }
};

module.exports = apiController;
