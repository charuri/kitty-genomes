import fs from 'fs';
import genKittyData from './nyaa/datafunc'

// TODO make this a command argument parameter
let limit = 100;

// TODO put data into mongo
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

// DO EVERYTHING HERE
let data = genKittyData(limit, (data) => {
    // console.log(data);
    fs.writeFile('./kitties.json', JSON.stringify(data, null, 4), (error) => {
        /* handle error */
        if (error) {
            console.log("There has been an error updating kitties.json: ", error);
        }
    });
});
