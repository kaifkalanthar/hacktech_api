require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Register = require('./models/register');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected");
}).catch(error => {
    console.log(error);
})

app.get('/api/register', async (req, res) => {
    try {
        const register = await Register.find({});
        res.status(200).json(register);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.post('/api/register', async (req, res) => {
    try {
        const product = await Register.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ message: error.message });
    }
})

app.get('/', (req, res) => {
    res.send("Welcome Back chef!");
})

app.listen(5000, () => {
    console.log("Hey!");
})

