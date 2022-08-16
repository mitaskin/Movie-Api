const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://movie-user:MoviePass123@movieapidb.rdkxcdb.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected', () => {
        console.log('MongoDB: Connected')
    })

    // mongoose.connection.on('error', () => {
    //     console.log('MongoDB: Error')
    // })

};


// const {MongoClient, ServerApiVersion} = require('mongodb');
// const uri = "mongodb+srv://movie-user:MoviePass123@movieapidb.rdkxcdb.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
//
//
// module.exports = () => {
//
//     client.connect(err => {
//         const collection = client.db("test").collection("devices");
//         // perform actions on the collection object
//         //console.log(collection);
//         client.close();
//     });
//
// };