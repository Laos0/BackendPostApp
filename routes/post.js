import * as database from '../database.js';
import express from 'express';


export const router = express.Router();

router.get('/', async (req, res) => {
 
    console.log("Posting TEst wokring")
});

// Frontend will call this endpoint and send in email and password data
router.post('/', async (req, res) => {
    console.log("<< post.js >> ", req.body);

    const data = req.body;

    let result = await database.post(data.userId, data.title, data.text, data.views);
    
    /* TODO: Store the new post into database through databse.js */
}); 
