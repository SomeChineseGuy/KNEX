require('dotenv').config();

const knex = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: 'knex,public'
});

const arg = process.argv[2];
console.log("Searching...");
knex.select().from('famous_people').where('last_name', arg).asCallback(function (err, rows) {
  if (err) {
    return console.error(err);
  }
  let personId = rows[0].id;
  let firstName = rows[0].first_name;
  let lastName = rows[0].last_name;
  let yearBirth = rows[0].birthdate.getFullYear();
  let monthBirth = rows[0].birthdate.getMonth();
  let dayBirth = rows[0].birthdate.getDate();
  console.log("Found 1 person(s) by the name '" + arg + "':");
  console.log(`- ${personId}: ${firstName} ${lastName}, born '${yearBirth}-${monthBirth}-${dayBirth}'`);

  knex.destroy();
});

