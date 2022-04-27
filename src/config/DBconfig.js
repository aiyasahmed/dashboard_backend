const mysql = require("mysql");

// db connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_dashboard",
});

db.connect((err) => {
  if (err) throw err;
  console.log("db connected");
});

module.exports = db;
