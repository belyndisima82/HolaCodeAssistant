// If using MySQL, install mysql2 package with npm install -S mysql2
//mysql2 npm package has support for Promises
var mysql = require('mysql');

//change database credentials as needed
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'attendance',
});

const addAttendance = function(name, day, callback) {
  connection.query(
    'INSERT INTO students (name, day) VALUES (?, ?)',
    [name, day],
    (err, results, fields) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(results);
        callback(null, results);
      }
    }
  );
};


module.exports.addAttendance = addAttendance;
