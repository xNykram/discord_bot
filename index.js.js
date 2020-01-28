// Marcepan Bot discord bot //
// Version 0.2 by Nykram //
const discord = require('discord.js');
const client = new discord.Client();
const editJsonFile = require("edit-json-file");
const fs = require('fs');
const cheerio = require('cheerio');
const prefix = "!"
const request = require('request');

const statusForum = [

];


const modNames = [
    "Akaexus",
    "Evans",
    "Carla",
    "Herato",
    "Dejv",
    "Sniper",
    "Kalman",
    "Chrzan",
    "Songo",
    "Nishino",
    "Richi",
    "PRT"

];
// Dodawanie nowego żartu
editDataJson = (username, joke) => {
    let file = editJsonFile(`${__dirname}/jokes.json`);
    this.name = username;
    this.joke = joke;
    let jokes = file.get(this.name);    
    if(file.get(this.name + ".nickname") == this.name){
        let jokelenght = Object.keys(jokes).length -1;
        if(jokelenght >= 1 && jokelenght < 5){
                    jokelenght++;
                    file.set(this.name + ".joke"+jokelenght, {
                            content: this.joke
                    });
                    file.save();
            }
        }
    else{
        file.set(this.name);
        file.set(this.name + ".nickname", this.name);
        file.set(this.name + ".joke1", {
            content: this.joke
        });
        file.save();
    }
}
// Zwraca ilość żartów //
amOfJokes = (username) => {
    this.username = username;
    let file = editJsonFile(`${__dirname}/jokes.json`);
    if(file.get(this.username + ".nickname") == this.username){
        let jokes = file.get(this.username);  
        let jokelenght = Object.keys(jokes).length -1;
        return jokelenght;
    }
}
// Zwraca żart //
returnRandomJoke = (username) =>{
    this.username = username;
    let file = editJsonFile(`${__dirname}/jokes.json`);
    if(file.get(this.username + ".nickname") == this.username){
        let rng = Math.floor(Math.random()* amOfJokes(this.username)+1);
        let obj = file.get(this.username + ".joke"+rng);
        return obj['content'];
    }
}   

getForumStatus = () => {
    let targeturl = [
        'https://mrucznik-rp.pl/status/',
        'https://mrucznik-rp.pl/status/php'
    ];
    for(let i = 0; i < 2; i++){
        request({
            method: 'GET',
            url: targeturl[i]
        }, (err, res, body) => {
            if (err) { return console.log(err); }
            const $ = cheerio.load(body);
            let text = $('body');
            statusForum[i] = text.text();
        });
    }

}
client.on('ready', ()=> {
    console.log('Bot został pomyślnie wczytany!');
    client.user.setActivity('Mrucznik Role Play');
    getForumStatus();
});
    client.on('message', message => {
        const args = message.content.slice(prefix.length).split(' ');
        const command = args.shift().toLowerCase();
        for (let i = 0; i < modNames.length; i++){
            let modlow = modNames[i].toLowerCase();
            if (command === modlow) {
                if (!args.length) {
                    return message.channel.send(`Nie podałeś argumentów, ${message.author}!`);
                } else {
                    let output = args.toString().split(',').join(' ').toLowerCase();
                    editDataJson(modNames[i], output);
                    if(amOfJokes(modNames[i]) == 5){
                        return message.channel.send(`${message.author}, przekroczono limit dla `+ modNames[i] + ".");
                    }
                    else{
                        return message.channel.send(`${message.author}, pomyślnie dodano.`);
                    }
                }
            } 
        }
        for (let i = 0; i < modNames.length; i++){
            let lower = modNames[i];
            lower = lower.toLowerCase();
            if(message.content.includes(modNames[i]) || message.content.includes(lower)){
                return message.channel.send(returnRandomJoke(modNames[i]));
            }
        }
        if(command === 'status'){
            let monitoring = client.channels.get('609031533713686538');
            monitoring.send({embed: {
                color: 3447003,
                fields: [{
                    name: "Status Forum",
                    value: 'CloudFlare: '+ statusForum[0]
                },
                {
                    name: "Status PHP",
                    value: 'PHP: ' + statusForum[1]
                }
                ],
                timestamp: new Date(),
              }});
        }
});

client.login('');