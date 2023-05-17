const fs = require('fs');
const apiDolar = require('./apiDolar.js');

const notifPath = './dolar/config/notificationList.json';

// Keep track of the intervals that are set for each user and dolar type
const intervals = {};

function checkForDolarChanges(client) {
  // Read the notification list from the file
  let notificationList = JSON.parse(fs.readFileSync(notifPath));

  // Iterate over each user in the notification list
  notificationList.forEach(item => {
    // Iterate over each dolar that the user wants to be notified of
    item.dolars.forEach(dolar => {
      // Set an interval to check for changes at the specified interval
      const interval = setInterval(() => {
        // Call fetchData to get the current value of the dolar
        apiDolar.fetchData((ventaText) => {
          // Extract the current value of the dolar from ventaText
          const lines = ventaText.split('\n');
          const line = lines.find(line => line.toLowerCase().includes(dolar.type));
          const currentValue = Number(line.split(': ')[1]);

          // Check if the value has changed since the last check
          if (dolar.lastValue && currentValue !== dolar.lastValue) {
            // Determine if the value increased or decreased
            const change = currentValue > dolar.lastValue ? 'subió' : 'bajó';
            // Notify the user of the change
            client.sendText(item.user, `El dolar ${dolar.type} ${change} de ${dolar.lastValue} a ${currentValue}`);
          }

          // Update the last value of the dolar
          dolar.lastValue = currentValue;
        });
      }, dolar.interval * 60 * 1000);

      // Store the interval in the intervals object
      if (!intervals[item.user]) {
        intervals[item.user] = {};
      }
      intervals[item.user][dolar.type] = interval;
    });
  });
}

function addUserToNotificationList(user, dolarType, interval) {
    // Read the notification list from the file
    let notificationList = JSON.parse(fs.readFileSync(notifPath));
  
    // Check if the user is already in the notification list
    let userIndex = notificationList.findIndex(item => item.user === user);
    if (userIndex !== -1) {
      // Update the user's entry in the notification list
      notificationList[userIndex].dolars.push({ type: dolarType, interval: interval });
    } else {
      // Add a new entry for the user in the notification list
      notificationList.push({
        user: user,
        dolars: [{ type: dolarType, interval: interval }]
      });
    }
  
    // Write the updated notification list to the file
    fs.writeFileSync(notifPath, JSON.stringify(notificationList));
  }

  function removeUserFromNotificationList(user, dolarType) {
    // Read the notification list from the file
    let notificationList = JSON.parse(fs.readFileSync(notifPath));
  
    // Find the user in the notification list
    let userIndex = notificationList.findIndex(item => item.user === user);
    if (userIndex !== -1) {
      // Find the dolar type in the user's dolars array
      let dolarIndex = notificationList[userIndex].dolars.findIndex(item => item.type === dolarType);
      if (dolarIndex !== -1) {
        // Remove the dolar type from the user's dolars array
        notificationList[userIndex].dolars.splice(dolarIndex, 1);
  
        // If the user's dolars array is now empty, remove the user from the notification list
        if (notificationList[userIndex].dolars.length === 0) {
          notificationList.splice(userIndex, 1);
        }
  
        // Clear the interval for this user and dolar type
        clearInterval(intervals[user][dolarType]);
      }
    }
  
    // Write the updated notification list to the file
    fs.writeFileSync(notifPath, JSON.stringify(notificationList));
  }
  module.exports = {checkForDolarChanges, addUserToNotificationList, removeUserFromNotificationList};