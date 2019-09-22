const discord = require('discord.js');
const client = new discord.Client();
// #monitoring -> 625046909614293042

let Bot = function(version){
    this.version = version;
    this.message = function() {
        console.log("hej");
    };
}
let marcepanMarks = new Bot("v0.01");


client.on('ready', ()=> {
    console.log('Bot został pomyślnie wczytany!');
    client.user.setActivity('Mrucznik Role Play');
});
client.on('message', msg => {
    if (msg.content === 'marcepan') {
      let monitoring = client.channels.get('625046909614293042');
      monitoring.send('Hej, jestem Marcepan_Marks! '+ marcepanMarks.version);
    }
});

client.login('');