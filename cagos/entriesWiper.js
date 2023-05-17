var mysql = require('mysql');
var con = mysql.createConnection({
    host: '192.168.0.20',
    user: 'timulo',
    password: 'Shit_doble1',
    database: 'cagos'
});

con.connect(function(err) {
  if (err) throw err;
  var sql = "DELETE FROM entries";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});