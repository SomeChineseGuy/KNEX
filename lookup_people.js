const pg = require("pg");
const settings = require("./settings");
const arg = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    let personId = result.rows[0].id;
    let firstName = result.rows[0].first_name;
    let lastName = result.rows[0].last_name;
    let yearBirth = result.rows[0].birthdate.getFullYear();
    let monthBirth = result.rows[0].birthdate.getMonth();
    let dayBirth = result.rows[0].birthdate.getDate();
    console.log("Found 1 person(s) by the name '" + arg + "':");
    console.log(`- ${personId}: ${firstName} ${lastName}, born '${yearBirth}-${monthBirth}-${dayBirth}'`);
    // console.log(firstName, lastName, yearBirth, monthBirth, dayBirth);
    client.end();
  });
});
