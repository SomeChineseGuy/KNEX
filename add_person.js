const firstName = process.argv[2];
const lastName = process.argv[3];
const DOB = process.argv[4];
const settings = require('./settings');

const knex = require('knex')({
  client: 'pg',
  connection: settings,
  searchPath: 'knex,public'
});
function add(first, last, date) {
  knex('famous_people').insert({first_name: firstName, last_name: lastName, birthdate: DOB}).then(() => {
    console.log("Inserted");
    knex.destroy();
    console.log(firstName, lastName, DOB);
  });
}

add(firstName, lastName, DOB);