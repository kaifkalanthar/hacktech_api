require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const Post = require('./model/Post');
const app = express();
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect(process.env.MONGODB_URL);


app.post('/post', async (req, res) => {

    const { team_name, team_lead, ps_number, link, team_member1, team_member2, team_member3, team_member4, team_member5 } = req.body;
    const postDoc = await Post.create({
        team_name,
        team_lead,
        ps_number,
        link,
        team_member1,
        team_member2,
        team_member3,
        team_member4,
        team_member5
    });

    res.json(postDoc);
});

app.get('/post', async (req, res) => {
    res.json(await Post.find());
})

app.listen(5000, () =>{
    console.log("Hey! Kaif");
    console.log(process.env.MONGODB_URL);
});