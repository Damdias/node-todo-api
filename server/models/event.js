var mongoose = require("mongoose");

var Event = mongoose.model("Event", {
    name: {
        type: String,
        required: true
    },
    prices: [{
        label: {
            type: String,

        },
        price: {
            type: Number
        },
        total_tickets: {
            type: Number
        },
        sold_tickets: { type: Number }
    }]
});

module.exports = {Event};