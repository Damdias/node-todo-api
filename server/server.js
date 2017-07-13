
require("./config/config.js");
var express = require("express");
var bodyParser = require("body-parser");
const _ = require("lodash");


var {
    mongoose
} = require('./db/mongoose');
var {
    Todo
} = require("./models/todo");
var {
    User
} = require("./models/user");

var {
    ObjectID
} = require("mongodb");
const port = process.env.PORT || 3000;
var app = express();
app.use(bodyParser.json());
app.post("/todos", (req, res) => {

    var newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get("/todos", (req, res) => {

    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    });
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send({
                msg: 'Unable to find Todo'
            });
        }
        res.send({
            todo
        });
    }).catch((e) => {
        res.status(400).send({
            msg: 'Error occuer'
        });
    })

});
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send({
            msg: 'Unable to find id'
        });
    }
    Todo.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send({
                msg: 'unable to find doc'
            });
        }
        res.send({
            doc
        });
    }, (e) => {
        res.status(400).send({
            msg: 'unable to find doc'
        });
    }).catch((e) => {
        res.status(400).send({
            msg: 'Error occuer'
        });
    });
});
app.patch("/todos/:id", (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,['text','completed']);
   if(!ObjectID.isValid(id)){
       return res.status(404).send({msg:'Invalid id'});
   }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;
    }
    Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e)=>{
        res.status(400).send({msg:'Error occure'});
    })
   
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});


module.exports = {
    app
};