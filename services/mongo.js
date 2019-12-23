import { MONGO_URL, MONGO_DB, MONGO_COLLECTION } from '../configs';

const MongoClient = require('mongodb').MongoClient;

class Mongo {
    constructor() {}

    async update(key, query) {
        const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
        .catch(err => { console.log(err); });

        if(!client) { return; }

        try {
            const db = client.db(MONGO_DB);
            const collection = db.collection(MONGO_COLLECTION);

            collection.update(key, query);
        } catch(err) {
            console.log(err);
        } finally {
            client.close();
        }
    } 
}

const mongo = new Mongo();

module.exports = mongo;