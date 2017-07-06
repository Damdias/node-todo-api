


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
