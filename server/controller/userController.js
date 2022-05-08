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
  }
}

module.exports = userController;