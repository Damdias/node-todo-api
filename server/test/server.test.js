const expect = require("expect");
const request = require("supertest");

const {
    app
} = require("./../server");

const { Todo } = require("../models/todo");
const testtodos = [{
    text: 'Test todo text1'
},
{ text: 'test todo two' }];

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
                Todo.find({text}).then((docs) => {
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
describe("GET /Todos",()=>{
    it('should get all todos',(done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
           
        })
         .end(done);

    })
})