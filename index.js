import dotenv from 'dotenv/config';
import express from 'express';
import mongo from './configurations/mongoConnection.js';
import partRoutes from './routes/partRoute.js';
import userRoutes from './routes/userRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/part', partRoutes);
app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});