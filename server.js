import express from 'express';
import  {MongoClient} from 'mongodb';
// import dotenv from 'dotenv';
import cors from 'cors';


const app = express();
import {ObjectId} from 'mongodb';

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 4000;

const MONGO_URL = 'mongodb+srv://varunvijay:Varun2121@cluster0.yzmwc.mongodb.net/?retryWrites=true&w=majority'

async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected")
    return client;
}


const client = await createConnection();



app.get('/', function (req, res) {
    res.send("Hello World!");  
});


app.get('/cinemas', async function (req, res) {

    const result = await client.db('bookmyshow').collection('cinema').find({}).toArray();

    res.send(result)

    
})

app.get("/cinemas/:id", async (req, res) => {
    let objid = ObjectId(req.params.id);

    console.log(objid);

    let result = await client.db('bookmyshow').collection('cinema').findOne({_id: objid})

    console.log(result);

    res.send(result)
  })



app.delete("/cinemas/:id", async (req, res) => {
    let objid = ObjectId(req.params.id);

    let result = client.db('bookmyshow').collection('cinema').deleteOne({_id: objid}, (err) =>{
        if(err) {
            throw err;
        }
    })

    console.log(result);

    res.sendStatus(200)
    
  })

app.get('/movies', async function (req, res) {

    const result = await client.db('bookmyshow').collection('movies').find({}).toArray();

    console.log(result);

    res.send(result)
})

app.get('/movies/:id', async function (req, res) {

    const result = await client.db('bookmyshow').collection('movies').findOne({_id: req.params.id});
    

    res.send(result)
})

app.patch('/movies/:id', async function (req, res) {

    const result = await client.db('bookmyshow').collection('movies').findOneAndUpdate({_id: req.params.id}, {$set : {"rating.percentage" : req.body.rating.percentage, "rating.no_of_ratings": req.body.rating.no_of_ratings}}, { returnNewDocument: true })

    res.json(result)
})


app.get('/outdoor', async function (req, res) {

    const result = await client.db('bookmyshow').collection('outdoor').find({}).toArray();

    res.send(result)
})

app.get('/laughter', async function (req, res) {

    const result = await client.db('bookmyshow').collection('laughter').find({}).toArray();

    res.send(result)
})

app.get('/popular', async function (req, res) {

    const result = await client.db('bookmyshow').collection('popular').find({}).toArray();

    res.send(result)
})

app.get('/booking', async function (req, res) {

    const result = await client.db('bookmyshow').collection('booking').find({}).toArray();

    res.send(result)
})

app.post('/booking', async function (req, res) {

    movie_name = req.body.movie_name
    silver = req.body.silver
    date = req.body.date
    day = req.body.day
    time = req.body.time
    cinemas_name = req.body.cinemas_name
    silver = req.body.silver
    platinium = req.body.platinium
    price = req.body.price
    total_price = req.body.total_price
    banner_image_url = req.body.banner_image_url
    movie_grade = req.body.movie_grade

    res.status(201).json({
        movie_name, silver, date, day, time, cinemas_name, silver, silver, platinium, price, total_price, banner_image_url, movie_grade
      });
})


app.listen(PORT, () => console.log(`Server on ${PORT}`));
