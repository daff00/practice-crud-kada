import dotenv from 'dotenv/config';
import express from 'express';
import mongo from './configurations/mongoConnection.js'
import partRoutes from './controllers/partController.js'
import userRoutes from './controllers/userController.js'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded());
app.use('/part', partRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Example app is listening on ${PORT}`);
})