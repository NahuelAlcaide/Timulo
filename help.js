function commandHelp(client, message, commands){
    const args = message.body.split(' ');
    if (args.length > 1) {
        const command = args[1];
    if (commands[command]) {
        client.sendText(message.from, `*Uso del comando ${command}:*\n${commands[command].description}`);
    } else {
        client.sendText(message.from, `Comando desconocido: *${command}*`);
    }
    } else {
        const commandListText = Object.keys(commands).filter(command => command !== 'help' && !commands[command].adminOnly).join(`\n-`);
        client.sendText(message.from, `*Comandos disponibles*\n-${commandListText}\n\nUsar /help <Nombre de comando> para mas información`);
    }
}
   
module.exports = { commandHelp }
   