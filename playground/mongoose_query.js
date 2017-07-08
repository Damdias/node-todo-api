const { mongoose } = require("./../server/db/mongoose");
const { User } = require("./../server/models/user");
const { Todo } = require("./../server/models/todo");

// var id = '595ff5105ee7243318958127';

// Todo.find({ _id: id }).then((docs) => {
//     console.log(docs);
// })

// Todo.findOne({ _id: id }).then((docs) => {
//     console.log(docs);
// });
// Todo.findById(id).then((doc) => {
//     console.log(doc);
// }).catch((e) => console.log(e));

var userId = '5960ac3c1afc9e0b645edcd8';

User.findById(userId).then((user) => {
 
    if (!user) {
        return console.log("Unable to find user");
    }
    console.log(user);

}).catch((e) => console.log(e));

// User.find().then((docs)=>{
//     console.log(docs);
// });

// var newuser = new User({
//   email : 'dam@gamil.com'
// });
// newuser.save().then((doc)=>{
//     console.log(doc);
// })