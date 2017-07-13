const {Mongoose} = require("./../server/db/mongoose");

const {Todo}  = require('./../server/models/todo');

Todo.findByIdAndRemove('5966e1f68cd82b4808083ead').then((doc)=>{
    console.log(doc);
},(e)=>console.log('Unable to remove doc',e));