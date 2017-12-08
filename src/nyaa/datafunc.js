import fs from 'fs';
import _ from 'lodash';
import keysort from '../utils/keysort';

export default function genKittyData (manager, client, limit) {
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
            var output = {count: limit, kitties: keysort(kitties, 'id')};

            fs.writeFile('./kitties.json', JSON.stringify(output, null, 4), (error) => {
                /* handle error */
                if (error) {
                    console.log("There has been an error updating kitties.json: ", error);
                }
            });
        }).catch(console.error);
    }).catch(console.error);
}
