const apiDolar = require('./apiDolar.js');
const dolarChange = require('./dolarChange.js');

function command(client, message){
    apiDolar.fetchData((ventaText) => {
        const args = message.body.split(' ');
        const command = args[1];

        if (command === 'notif') {
            const subcommand = args[2];
            const dolarType = args[3];
            
            if (subcommand === 'add') {
            const interval = parseInt(args[4]);
            if (dolarType && interval && interval >= 2 && ['blue', 'solidario', 'ccl', 'bolsa', 'oficial'].includes(dolarType)) {
                dolarChange.addUserToNotificationList(message.from, dolarType, interval);
                dolarChange.checkForDolarChanges(client);
                client.sendText(message.from, `You will be notified of changes in ${dolarType} every ${interval} minutes.`);
            } else {
                client.sendText(message.from, 'Invalid arguments. Usage: /dolar notif add <dolar> <interval>');
            }
            } else if (subcommand === 'remove') {
            if (dolarType && ['blue', 'solidario', 'ccl', 'bolsa', 'oficial'].includes(dolarType)) {
                dolarChange.removeUserFromNotificationList(message.from, dolarType);
                client.sendText(message.from, `You will no longer be notified of changes in ${dolarType}.`);
            } else {
                client.sendText(message.from, 'Invalid arguments. Usage: /dolar notif remove <dolar>');
            }
            } else {
            client.sendText(message.from, 'Invalid arguments. Usage: /dolar notif <add/remove> <dolar> [interval]');
            }
        }else if (command) {
            const lines = ventaText.split('\n');
            const line = lines.find(line => line.toLowerCase().startsWith(`dolar ${command.toLowerCase()}`));
            if (line) {
                client.sendText(message.from, line);
            } else {
                client.sendText(message.from, `Que mierda es el dolar ${command}`);
            }
        } else {
            client.sendText(message.from, ventaText);
        }
    });
}

module.exports = { command };