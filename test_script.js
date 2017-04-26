const pg = require("pg");
const settings = require("./settings");
const arg = process.argv(2);

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
  console.log("Search...");
  client.query("SELECT * FROM famous_people WHERE last_name = $1::text", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Search...");
    console.log("Found 1 person(s) by the name '" + arg + "'");
    console.log(result.rows[0]);
    client.end();
  });
      console.log("Search...");
    console.log("Found 1 person(s) by the name '" + arg + "'");
});