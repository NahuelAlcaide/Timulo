const { addEntry, removeEntry, test, getEntryCount } = require('./db');

function command(client, message) {
    const args = message.body.split(' ');
    if (args.length > 1) {
        const action = args[1];
        const userId = message.from;
        const groupChat = userId.endsWith('@g.us');
        let shortName;
        if (groupChat) {
            shortName = message.sender.shortName;
        }
        switch (action) {
            case 'add':
                addEntry(userId, new Date(), shortName);
                break;
            case 'remove':
                removeEntry(userId, shortName);
                break;
            case 'test':
                test();
                break;
            case 'show':
                if (args.length > 2) {
                    shortName = args[2];
                }
                getEntryCount(userId, shortName, (result) => {
                    client.sendText(message.from, `Este mes cagaste *${result.monthCount}* veces\nY durante el año cagaste *${result.yearCount}* veces`);
                });
                break;
            default:
                client.sendText(message.from, `Invalid argument: *${action}*`);
        }
    } else {
        client.sendText(message.from, `Usage: /cago <add|remove|show> [shortName]`);
    }
}

module.exports = { command }
