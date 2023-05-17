const { addEntry } = require('./db.js');

const userId = "5492392513372-1553364401@g.us";
const shortNames = ["nahuel", "Bob", "Charlie", "Dave", "Eve"];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

for (let i = 0; i < 300; i++) {
  const timestamp = getRandomDate(new Date(2022, 0, 1), new Date());
  const shortName = shortNames[getRandomInt(0, shortNames.length - 1)];
  addEntry(userId, timestamp, shortName);
}
