const venom = require('venom-bot');

const fs = require('fs');

const commands = require('./commands.js');
const whitelist = require('./Config/Whitelist/whitelist.json');
const admin = whitelist[0];

const dolarChange = require('./dolar/dolarChange.js');

venom
    .create({
        session: 'session-name', //name of session
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

function start(client) {
    // Call the checkForDolarChanges function
    dolarChange.checkForDolarChanges(client);

    //Incoming message handler
    client.onMessage(async (message) => {
        if (message.type === 'chat' && whitelist.includes(message.from)) {
          if (message.body.startsWith('/')) {
            const commandName = message.body.split(' ')[0].slice(1).toLowerCase();
            const command = commands[commandName];
            if (command) {
              if (command.adminOnly && message.from !== admin) {
                client.sendText(message.from, 'This command is only available to the admin.');
              } else {
                command.run(client, message);
              }
            } else if (message.body === '/') {
              client.sendText(message.from, 'Ah sos gracioso');
              client.sendText(message.from, 'pavo');
            } else {
              client.sendText(message.from, `Que decís??? que garcha es ${commandName}`);
            }
          } else if (message.body.includes('@everyone')) {
            // Read list of group member IDs from file
            const groupMembersIds = JSON.parse(
              fs.readFileSync('./Config/everyoneList.json', 'utf8')
            );
            // Exclude sender from mentioned users
            const mentionedJidList = groupMembersIds.filter(
              (id) => id !== message.sender.id
            );
            // Send reply with mentions
            let mentionString = '';
            mentionedJidList.forEach((jid) => {
              mentionString += `@${jid.split('@')[0]} `;
            });
            client.sendMessageWithTags(
              message.from,
              `Miren este mensaje hijos de puta ${mentionString}`
            );
          }
        }
      });
      

}
