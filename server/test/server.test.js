const expect = require("expect");
const request = require("supertest");
var {
    ObjectID
} = require("mongodb");

const {
    app
} = require("./../server");

const {
    Todo
} = require("../models/todo");
const testtodos = [{
        _id: new ObjectID(),
        text: 'Test todo text1'
    },
    {
        _id: new ObjectID(),
        text: 'test todo two'
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(testtodos);
    }).then(() => done());
});


describe('POST /todos', () => {
    it("should create a new todo", (done) => {
        var text = 'Test todo text';
        request(app).post('/todos').send({
                text
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({
                    text
                }).then((docs) => {
                    expect(docs.length).toBe(1);
                    expect(docs[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it("should not create todo with invalid body data", (done) => {

        var text = '';

        request(app).post('./todos').send({
                text
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({}).then((docs) => {
                    expect(docs.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });


});
describe("GET /Todos", () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)

            })
            .end(done);

    })
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        console.log(testtodos[0]._id.toHexString());
        request(app)
            .get(`/todos/${testtodos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(testtodos[0].text);
            })
            .end(done)
    });
    it('should return not found 404', (done) => {
        let hexid = new ObjectID().toHexString();
        request(app)
            .get(`/todos/${hexid}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object id', (done) => {
        request(app)
            .get("/todos/1234")
            .expect(404)
            .end(done);
    })
});

describe("DELETE /tods/:id", () => {
    it("Should remove a todo", (done) => {
        let hexid = testtodos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexid}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.doc._id).toBe(hexid);
            }).end((err, res) => {

                if (err) {
                    return done(err);
                }
                Todo.findById(hexid).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }, (e) => doen());
            });
    });
    it("should return 404 if todo not found", (done) => {
        let hexid = new ObjectID().toHexString();
        request(app)
            .delete(`/todos/${hexid}`)
            .expect(404)
            .end(done);
    });
    it("should return 404 if object is is valid", (done) => {
        request(app)
            .delete("/todos/1234")
            .expect(404)
            .end(done);
    });
})