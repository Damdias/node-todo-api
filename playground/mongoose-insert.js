const {Mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

let todonew = new Todo({
    text:'do some thing'
});
todonew.save().then((doc)=>{
    console.log(doc);
},(e)=>console.log("Unable to save tod",e));