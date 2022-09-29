import * as database from '../database.js';
import express from 'express';
import { UserDetails } from '../responses/UserDetails.js';

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

        let user = await database.getUserDetailsByEmail(req.body.email); 
        
        // when extracting data, make sure to spell the fields correctly like it was in the backend: 
        // ex: data table user's field: first_name, last_name...
        let userDetails = new UserDetails(user[0].first_name, user[0].last_name, user[0].email, user[0].password);
        console.log("<< auth.js >>", user[0]); 

        userDetails.isLoggedIn = true;
        userDetails.id = await database.getUserIdByEmail(req.body.email);
        console.log("<< user ID >>", userDetails.id)
        res.send(JSON.stringify(userDetails));

        console.log("<< auth.js >>", userDetails.firstName + ": logged in"); 
        //res.send('{"isLoggedIn":true}');
    }else{
        res.send('{"isLoggedIn":false}');
        console.log("Fail to log in")
    }
    // req.body has all the data sent
    // to access email: req.body.email
    // console.log(req.body);
}); 