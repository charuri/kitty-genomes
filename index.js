// var meow = require('ethers-meow');
// var ethers = require('ethers');
// var provider = ethers.providers.getDefaultProvider();
// var manager = new meow.Manager(provider);

var ck = require('cryptokitties-contrib');

var fs = require('fs')
var parseArgs = require('minimist');
var options = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

console.log('helloworld');

var kitty = ck (options);

kitty.getAllKitties(10)
    .then(kitties => {
        console.log(kitties);
    });
