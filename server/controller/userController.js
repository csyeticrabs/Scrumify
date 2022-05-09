const db = require('../database/scrumifyModel');

const userController = {
  getPeople: async (req, res, next) => {
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
  },

  removePeople: async (req, res, next) => {
    try {
      const { worker_id } = req.body;
      const paramArr = [ worker_id ];
      const str = `DELETE FROM people WHERE worker_id = $1;`;

      await db.query(str, paramArr);
      return next();
    } catch(err) {
      return next({
        log: 400,
        message: 'Failed to delete user'
      })
    }
  }
}

module.exports = userController;