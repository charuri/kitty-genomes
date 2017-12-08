import meow from 'ethers-meow';
import ethers from 'ethers';
import ck from 'cryptokitties-contrib';
import fs from 'fs';
import parseArgs from 'minimist';
import genKittyData from './nyaa/datafunc'

const provider = ethers.providers.getDefaultProvider();
const manager = new meow.Manager(provider);
const options = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
const client = ck(options);

let limit = 10;

genKittyData(manager, client, limit);

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
