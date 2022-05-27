const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.t6k5q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const PartsCollection = client.db("PC_Builder_BD").collection("Parts");
        const ReviewCollection = client.db("PC_Builder_BD").collection("reviews");
        const BookingCollection = client.db("PC_Builder_BD").collection("bookings");

        app.get('/parts', async (req, res) => {
            const query = {};
            const cursor = PartsCollection.find(query);
            const Parts = await cursor.toArray();
            res.send(Parts);
        });
        app.get('/parts/:id', async (req, res) => {
            const id = req.params.id;

            const quary = { _id: ObjectId(id) }
            console.log(quary)
            const products = await PartsCollection.findOne(quary);
            res.send(products);
            console.log(products)

        });
        app.get('/review', async (req, res) => {
            const query = {};
            const cursor = ReviewCollection.find(query);
            const reviews = await cursor.toArray();
            res.send(reviews);
        });
       
        //post 

        app.post('/review', async (req, res) => {
            const reviews = req.body;
            console.log(reviews)
            const result = await ReviewCollection.insertOne(reviews)
            res.send(result)
        })
        app.post('/booking', async (req, res) => {
            const booking = req.body;
            console.log(booking)
            const result = await BookingCollection.insertOne(booking)
            res.send(result)
        })
    }
    finally {

    }
}
// client.connect(err => {
//   const Partscollection = client.db("PC_Builder_BD").collection("Parts");
//   // perform actions on the collection object
//   client.close();
// });
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello From PC Buider Bd')
})

app.listen(port, () => {
    console.log(`Pc builder bd listening on port ${port}`)
})
