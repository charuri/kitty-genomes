import meow from 'ethers-meow';
import ethers from 'ethers';
import ck from 'cryptokitties-contrib';
import fs from 'fs';
import parseArgs from 'minimist';
import _ from 'lodash';
import keysort from '../utils/keysort';

const provider = ethers.providers.getDefaultProvider();
const manager = new meow.Manager(provider);
const options = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
const client = ck(options);

/**
 * Generates and returns data of limit number of getAllKitties
 * @param {Number} limit
 # @return {Object} data
 */
export default function genKittyData (limit, callback) {
    console.log(`GENERATING ${limit} DATA KITTIES`);
    var kitties = [];
    var promise_kittens = [];
    var promise_genomes = [];
    let results = {};

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
            results = {count: limit, kitties: keysort(kitties, 'id')};
            return callback(results);
        }).catch(console.error);
    }).catch(console.error);
}
