const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));

    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
            { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
            'campsites');
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));


               
        /* Old insertion code 
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
        */
    