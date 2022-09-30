import * as database from '../database.js';
import express from 'express';


export const router = express.Router();

router.get('/', async (req, res) => {
 
    console.log("Posting TEst wokring")
});

// Frontend will call this endpoint and send in the userId, title, textField, and views
router.post('/new', async (req, res) => {
    console.log("<< post.js >> ", req.body);

    const data = req.body;

    let result = await database.post(data.userId, data.title, data.text, data.views);

    res.send(result);
}); 

router.get('/all', async (req, res) => {
    console.log("Getting all posts...")

    let posts = await database.getAllPosts();
    res.send(posts);
});