var {Todo} = require("./models/Todo");



var findById = function (id) {
    if (id) {
        id = '595cacc0c4b206a81e858eed';
    }
    Todo.findById(id).then((doc) => {
        //console.log("find doc",doc);
        var item = doc.prices.filter((item) => {

            if (item.label === 'ODC') {
                item.total_ticket -= 2;
                return item;
            }
        });
        console.log(item);
        console.log(JSON.stringify(doc, undefined, 2));
        doc.text = doc.text + 'dd';
        Todo.update({
            _id: '595cacc0c4b206a81e858eed'

        }, doc).then((result) => {
            console.log("Update sucess");
        }, (e) => {
            console.log("update not success");
        })
    }, (e) => {
        console.log('Unable read object');
    });
}

module.exports = {findById}