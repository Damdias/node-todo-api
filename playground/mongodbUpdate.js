const {
    MongoClient,
    ObjectId
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDb server');
    }
    console.log("Connected to MongoDB server");

    db.collection("Users").findOneAndUpdate({
        name: 'Jen'
    }, {
        $set: {
            name: 'Damith'
        }
    }).then((result) => {
        console.log(JSON.stringify(result, undefined, 2))
    }, (err) => {
        console.log("Error occur", err);
    })

    db.close();
})