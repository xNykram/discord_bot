const discord = require('discord.js');
const client = new discord.Client();
const fs = require('fs');
// #monitoring -> 625046909614293042
// #ranking -> 619262539947311117
const prefix = "!"
const modNames = [
    'Akaexus',
    'Evans',
    'Sabrina',
    'Herato',
    'Sniper',
    'Songo',
    'Dejv',
    'chrzan',
    'Kalman'
];
// funkcja zapisywania żartów do json
saveJokeToFile = (name, joke) => {
    this.name = name;
    this.joke = joke;
    var data = {}
    data.table = []
        for (i=0; i < 1 ; i++){
            var obj = {
            moderator: this.name,
            joke: this.joke
            }
            data.table.push(obj)
        }
        fs.writeFile ("jokes.json", JSON.stringify(data), function(err) {
            if (err) throw err;
            }
)};
readJsonFromFile = () => {
    let data = fs.readFileSync('jokes.json');
    let moderator = JSON.parse(data);
    console.log(moderator['table'][0]['joke']);
}
readJsonFromFile();
//saveJokeToFile('Sniper', 'dsassda');


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
    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        for (let i = 0; i < modNames.length; i++){
            let modlow = modNames[i].toLowerCase();
            if (command === modlow) {
                if (!args.length) {
                    return message.channel.send(`Nie podałeś argumentów, ${message.author}!`);
                } else {
                    let output = args.toString().split(',').join(' ');
                    saveJokeToFile(modNames[i], output);
                    return message.channel.send(`${message.author}, pomyślnie dodano.`);
                }
            } 
        }

});
client.login('');