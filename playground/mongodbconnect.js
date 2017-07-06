const {
    MongoClient,
    ObjectId
} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
    if (err) {
        console.log('Unable to connect to MongoDb server');
    }
    console.log("Connected to MongoDB server");

    // db.collection("Todos").insertOne({
    //     text: 'Walk the dog',
    //     completed: false

    // }, (err, result) => {
    //     if (err)
    //         return console.log('Unable to insert todo', err);
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    //     db.close();
    // })
    db.collection("Users").insertOne({
            name: 'Jen',
            age: 34,
            location: 'Malave'
        })
        .then((result) => {
            console.log(JSON.stringify(result, undefined, 2));
        }, (err) => {
            console.log('Error occur', err);
        });


})