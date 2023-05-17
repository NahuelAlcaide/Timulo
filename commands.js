// commands.js

const dolarCommand = require('./dolar/dolarCommand.js');

const whitelist = require('./Config/Whitelist/whitelist.js');

const help = require('./help.js');

const cagos = require('./cagos/cagos.js');

const commands = {
    whitelist: {
        run: (client, message) => {
            whitelist.command(client, message);
        },
        description: 'This command adds or removes a user from the whitelist or shows the current whitelist.',
        adminOnly: true
    },
    dolar: {
        run: (client, message) => {
            dolarCommand.command(client, message);
        },
        description: '/dolar --> Muestra una lista de todos los valores del dolar\n/dolar <dolar> --> Muestra solamente el valor del dolar seleccioando. Ej: El comando /dolar blue muestra el valor del dolar blue',
        adminOnly: false
    },
    hola: {
        run: (client, message) => {
            client.sendText(message.from, 'Tu nariz contra mis bolas');
        },
        description: 'Este comando te saluda',
        adminOnly: false
    },
    help: {
        run: (client, message) => {
            help.commandHelp(client, message, commands);
        },
        description: '/help --> Muestra una lista de todos los comandos disponibles\n/help <comando> --> Muestra el uso del comando seleccionado. Ej: El comando /help dolar muestra el uso del comando dolar',
        adminOnly: false
        },
    cago: {
        run: (client, message) => {
            cagos.command(client, message);
        },
        description: '/cago <add|remove> --> Adds or removes an entry from the database',
        adminOnly: false
        }
};

module.exports = commands;