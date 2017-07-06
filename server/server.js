var mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp");

var PriceArr = mongoose.model('PriceArr', {
    label: {
        type: String
    },
    price: {
        type: Number
    },
    total_ticket: {
        type: Number
    }
})

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    },
    prices: [{
        label: {
            type: String
        },
        price: {
            type: Number
        },
        total_ticket: {
            type: Number
        }
    }]
});


// var newTodo = new Todo({
//     text: 'Cook dinner'

// });

// newTodo.save().then((doc) => {
//     console.log('Saved todo ', doc);
// }, (e) => {
//     console.log("Unable to save todo");
// })

// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed : false,
//     completedAt : 123
// });

// otherTodo.save().then((doc)=>{
//     console.log(JSON.stringify(doc),undefined,2);
// },(e)=>{
//  console.log("Unable to save",e);
// })

// Todo.findById('595c91922e873d0c3e1694f0').then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
//     doc.text += " update1";
//     doc.completedAt = new Date().getTime();
//     Todo.update({
//         _id: '595c91922e873d0c3e1694f0'
//     }, doc).then((udoc) => {
//         console.log("update success");
//     }, (e) => {
//         console.log('Unable to update doc', e);
//     })

// }, (e) => {
//     console.log("Unable to find doc", e);
// })

// var todowithPrice = new Todo({
//     text: 'Fast Furious 8',
//     completed: false,
//     prices: [{
//         label: 'ODC',
//         total_ticket: 100,
//         price: 250
//     }]

// });

// todowithPrice.save().then((doc) => {
//     console.log("saved new doc");
// }, (e) => {
//     console.log("Unable save doc", e);
// })
Todo.findById('595cacc0c4b206a81e858eed').then((doc) => {
//console.log("find doc",doc);
   var item = doc.prices.filter((item) => {
        
        if (item.label === 'ODC') {
            item.total_ticket -= 2;
          return item;
        }
    });
    console.log(item);
    console.log(JSON.stringify(doc,undefined,2));
    doc.text = doc.text +'dd';
    Todo.update({_id : '595cacc0c4b206a81e858eed'
        
    }, doc).then((result) => {
        console.log("Update sucess");
    }, (e) => {
        console.log("update not success");
    })
}, (e) => {
    console.log('Unable read object');
});