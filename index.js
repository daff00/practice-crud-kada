import dotenv from 'dotenv/config';
import express from 'express';
import mongo from './configurations/mongoConnection.js'
import routes from './controllers/controller.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded());
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Example app is listening on ${PORT}`);
})