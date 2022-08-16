const {MongoClient, ServerApiVersion} = require('mongodb');
const uri = "mongodb+srv://movie-user:MoviePass123@movieapidb.rdkxcdb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});


module.exports = () => {

    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        client.close();
    });

};