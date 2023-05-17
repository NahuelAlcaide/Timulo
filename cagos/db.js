const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '192.168.0.20',
  user: 'timulo',
  password: 'Shit_doble1',
  database: 'cagos'
});

connection.connect();

function addEntry(userId, timestamp, shortName) {
  const query = 'INSERT INTO entries (userId, timestamp, shortName) VALUES (?, ?, ?)';
  connection.query(query, [userId, timestamp, shortName], (error) => {
    if (error) throw error;
  });
}

function removeEntry(userId, shortName) {
    let query;
    if (shortName) {
      query = 'DELETE FROM entries WHERE userId = ? AND shortName = ? ORDER BY timestamp DESC LIMIT 1';
      connection.query(query, [userId, shortName], (error) => {
        if (error) throw error;
      });
    } else {
      query = 'DELETE FROM entries WHERE userId = ? ORDER BY timestamp DESC LIMIT 1';
      connection.query(query, [userId], (error) => {
        if (error) throw error;
      });
    }
  }

function getEntryCount(userId, shortName, callback) {
  let query;
  if (shortName) {
    query = `SELECT COUNT(*) as count,
    SUM(MONTH(timestamp) = MONTH(CURRENT_DATE())) as monthCount,
    SUM(YEAR(timestamp) = YEAR(CURRENT_DATE())) as yearCount
    FROM entries WHERE userId = ? AND shortName = ?`;
    connection.query(query, [userId, shortName], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  } else {
    query = `SELECT COUNT(*) as count,
    SUM(MONTH(timestamp) = MONTH(CURRENT_DATE())) as monthCount,
    SUM(YEAR(timestamp) = YEAR(CURRENT_DATE())) as yearCount
    FROM entries WHERE userId = ?`;
    connection.query(query, [userId], (error, results) => {
      if (error) throw error;
      callback(results[0]);
    });
  }
}
  
  

function test() {
  const query = 'SELECT * FROM entries ORDER BY timestamp DESC LIMIT 1';
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log(results[0]);
  });
}
  
module.exports = { addEntry, removeEntry, test, getEntryCount };
  
