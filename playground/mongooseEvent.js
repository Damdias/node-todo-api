const { mongoose } = require('./../server/db/mongoose');
const { Event } = require("./../server/models/event");

// var newEvent = new Event({
//     name: "Meet up",
//     prices: [
//         {
//             label: 'Normal',
//             price: 100,
//             total_tickets: 200,
//             sold_tickets: 0
//         },
//         {
//             label: 'Silver',
//             price: 250,
//             total_tickets: 100,
//             sold_tickets: 0
//         },
//         {
//             label: 'Gold',
//             price: 500,
//             total_tickets: 50,
//             sold_tickets: 0
//         }
//     ]
// });

// newEvent.save().then((docs) => {
//     console.log(JSON.stringify(docs, undefined, 2));
// }, (e) => {
//     console.log("unable to save new event", e);
// })

//************Find one event

// Event.findById('5961b160eb3b4035381ce57d').then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// },
//     (e) => {
//         console.log('Unable to find event', e);
//     }) ;

//********** Find sub document */
// var label = 'Silver';
// Event.findById('5961b160eb3b4035381ce57d').then((doc) => {

//     var price = doc.prices.filter((item) => {
//         if(item.label === label){
//             return item;
//         }
//     })

//     console.log(price);
//   //  console.log(JSON.stringify(doc, undefined, 2));
// },
//     (e) => {
//         console.log('Unable to find event', e);
//     });

// ************** purchase one silver ticket

// var label = 'Silver';
// var noofTickets = 1;
// Event.findById('5961b160eb3b4035381ce57d').then((doc) => {

//     var price = doc.prices.filter((item) => {
//         if (item.label === label) {
//             return item;
//         }
//     })
//    doc.name = 'Meet up';
//    // purchaseTicket(price, noofTickets);
//   price.label = 'hhh';
//     Event.update({ _id : doc._id }, doc).then((res) => {
//         console.log("success ticket purchase");
//     }, (e) => {
//         console.log('Error occuer in purchase ', e);
//     });

//     console.log(price);
//     //  console.log(JSON.stringify(doc, undefined, 2));
// },
//     (e) => {
//         console.log('Unable to find event', e);
//     });

var purchaseTicket = (ticket, nofTickets) => {

    ticket.total_tickets = ticket.total_tickets - nofTickets;
    ticket.sold_tickets = ticket.sold_tickets + nofTickets;
};

//********** find sub document */
var subdocid = '59625acc08eb53e590badb3d';

Event.findOne({ _id: subdocid},{ prices: { $elemMatch: { label: 'Silver' } } }).then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2));
    Event.update({ _id: subdocid,'prices.label': 'Silver'}, {
        $set: {
            'prices.$.total_tickets': 2
        }
    }).then((res) => {
        console.log('update succuess');
    }, (e) => console.log('unable to update', e))

    //  Event.update({ _id: subdocid }, { prices: { $elemMatch: { label: 'Silver' } } }, doc).then((res) => {
    //     console.log('update succuess');
    // }, (e) => console.log('unable to update', e))

    //  doc.prices[0].total_tickets = 200;
    // var label = 'Silver';
    // var price = doc.prices.filter((item) => {
    //     if (item.label === label) {
    //        purchaseTicket(item,2);
    //     }
    // });
   
    // Event.update({ _id: subdocid }, doc).then((res) => {
    //     console.log('update succuess');
    // }, (e) => console.log('unable to update', e))

}, (e) => {
    console.log('Unable to find doc')
});
