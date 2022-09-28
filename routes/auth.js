import * as database from '../database.js';
import express from 'express';

export const router = express.Router();

// loginTest
router.get('/loginTest', async (req, res) => {
    res.send("Logging in");
    console.log("HIT")
});

// Frontend will call this endpoint and send in email and password data
router.post('/login', async (req, res) => {

    const isLoggedIn = await database.login(req.body.email, req.body.password);

    if(isLoggedIn){
        console.log("logged in"); 
        res.send('{"isLoggedIn":true}');
    }else{
        res.send('{"isLoggedIn":false}');
        console.log("Fail to log in")
    }
    // req.body has all the data sent
    // to access email: req.body.email
    // console.log(req.body);
}); 