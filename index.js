// var meow = require('ethers-meow');
// var ethers = require('ethers');
// var provider = ethers.providers.getDefaultProvider();
// var manager = new meow.Manager(provider);

var ck = require('cryptokitties-contrib');

var fs = require('fs')
var parseArgs = require('minimist');
var options = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/kitties';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});


console.log('helloworld');

var kitty = ck (options);

kitty.getAllKitties(10)
    .then(kitties => {
        // console.log(kitties);
    }).catch(console.error);
