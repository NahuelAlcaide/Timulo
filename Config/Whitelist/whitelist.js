const fs = require('fs');

const whitelist = require('./whitelist.json');

function command(client, message){
    const args = message.body.split(' ');
    if (args.length > 1) {
        const action = args[1];
        if (action === 'add') {
            if (args.length > 2) {
                const user = args[2];
                if (!whitelist.includes(user)) {
                    whitelist.push(user);
                    fs.writeFileSync('./whitelist.json', JSON.stringify(whitelist));
                    client.sendText(message.from, `${user} has been added to the whitelist.`);
                } else {
                    client.sendText(message.from, `${user} is already in the whitelist.`);
                }
            } else {
                client.sendText(message.from, 'Please provide a user ID to add to the whitelist.');
            }
        } else if (action === 'remove') {
            if (args.length > 2) {
                const user = args[2];
                if (whitelist.includes(user)) {
                    const index = whitelist.indexOf(user);
                    whitelist.splice(index, 1);
                    fs.writeFileSync('./whitelist.json', JSON.stringify(whitelist));
                    client.sendText(message.from, `${user} has been removed from the whitelist.`);
                } else {
                    client.sendText(message.from, `${user} is not in the whitelist.`);
                }
            } else {
                client.sendText(message.from, 'Please provide a user ID to remove from the whitelist.');
            }
        } else if (action === 'show') {
            client.sendText(message.from, `Whitelist: ${whitelist.join(', ')}`);
        } else {
            client.sendText(message.from, `Unknown action: ${action}`);
        }
    } else {
        client.sendText(message.from, 'Please provide an action (add, remove or show) and a user ID if necessary.');
    }
}

module.exports = { command }