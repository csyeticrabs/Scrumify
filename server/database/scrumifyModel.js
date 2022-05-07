const { Pool } = require('pg');

const PG_URI =
  'postgres://mfnzvlln:kcrrw8Q1N7SZiYuu9mXBukaYqFeg3-pO@heffalump.db.elephantsql.com/mfnzvlln';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('excuted query', text);
    return pool.query(text, params, callback);
  },
};
