var meow = require('ethers-meow');
var ethers = require('ethers');
var provider = ethers.providers.getDefaultProvider();
var manager = new meow.Manager(provider);

var ck = require('cryptokitties-contrib');

var fs = require('fs')
var parseArgs = require('minimist');
var options = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
var _ = require('lodash');

// import keysort from './utils/keysort.js';

// var MongoClient = require('mongodb').MongoClient,
//     assert = require('assert');
// var mongoose = require('mongoose');
//
// mongoose.Promise = Promise;
//
// // Connection URL
// var url = 'mongodb://localhost:27017/kitties';

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   db.close();
// });
// const db = new Db('kitties', new Server('localhost', 27017));
// db.open()
//   .then(() => {
//
//   })

console.log('KITTY GENOMES');

var client = ck(options);
let limit = 10;

genKittyData(client, limit);

function genKittyData (client, limit) {
    var kitties = [];
    var promise_kittens = [];
    var promise_genomes = [];

    for (var id = 1; id <= limit; id++) {
        promise_kittens.push(client.getKitten(id).then(kitten => {
            promise_genomes.push(manager.getKitty(id).then(kitty => {
                kitties.push({
                    id: kitten.id,
                    name: kitten.name,
                    genes: kitty.genes,
                    generation: kitten.generation,
                    color: kitten.color,
                    is_exclusive: kitten.is_exclusive,
                    is_fancy: kitten.is_fancy,
                    fancy_type: kitten.fancy_type,
                    sire: kitten.sire.id,
                    matron: kitten.matron.id,
                    children: _.map(kitten.children, 'id'),
                    cattributes: _.map(kitten.cattributes, 'description')
                });
            }).catch(console.error));
        }).catch(console.error));
    }

    Promise.all(promise_kittens).then(() => {
        Promise.all(promise_genomes).then(() => {
            var output = {count: limit, kitties: kitties};

            fs.writeFile('./kitties.json', JSON.stringify(output, null, 4), (error) => {
                /* handle error */
                if (error) {
                    console.log("There has been an error updating kitties.json: ", error);
                }
            });
        }).catch(console.error);
    }).catch(console.error);
}
