const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.t6k5q.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const PartsCollection = client.db("PC_Builder_BD").collection("Parts");

        app.get('/parts', async (req, res) => {
            const query = {};
            const cursor = PartsCollection.find(query);
            const Parts = await cursor.toArray();
            res.send(Parts);
          });
    }
    finally{

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
