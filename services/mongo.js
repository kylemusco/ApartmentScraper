import { MONGO_URL, MONGO_DB, MONGO_COLLECTION } from '../configs';

const MongoClient = require('mongodb').MongoClient;

class Mongo {
    constructor() {}

    async update(key, query) {
        const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .catch(err => { console.log(err); });

        if(!client) { return; }

        try {
            const db = client.db(MONGO_DB);
            const collection = db.collection(MONGO_COLLECTION);

            collection.updateOne(key, query);
        } catch(err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
    
    async find(query) {
        const client = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true  })
        .catch(err => { console.log(err); });

        if(!client) { return; }

        let res = undefined;

        try {
            const db = client.db(MONGO_DB);
            const collection = db.collection(MONGO_COLLECTION);

            res = await collection.find(query).toArray();
        } catch(err) {
            console.log(err);
        } finally {
            client.close();
            return res;
        }
    }
}

module.exports = new Mongo();