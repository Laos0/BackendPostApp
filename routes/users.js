/*  These routers are known as middleware
    that will have access to the request object
    (req), the reponse object (res) and the middleware function 
    commonly denoted by a variable named next

    We will use methods from database.js to respond accordingly 
    base on user requests
*/

import * as database from '../database.js';
import express from 'express';
import { UserDetails } from '../responses/UserDetails.js';

export const router = express.Router();

// return all users
router.get('/hello', async (req, res) => {
    console.log("HELLO");
    res.send("HELLO RETURNED FROM SERVER");
});

// return all users
router.get('/', async (req, res) => {
    // await - wait til the promise is resolved then set users
    const users = await database.getUsers();
    res.send(users);
});

// return specific user based on id
router.get('/:id', async(req, res) => {
    const user = await database.getUserDetailsById(req.params.id);
    //console.log("HITTING BACKEND FOR GET USERID", user);
    res.send(user[0]);
    //res.send(`Get User With ID ${req.params.id}`);
});

// add/create a new user
router.post('/new', async (req, res) => {

    // the request comes with email and password
    let rq = req.body;

    // Angular will send data from the forms to the backend
    const result = await database.createUser(rq.firstName, rq.lastName, rq.email, rq.password); 
    console.log("<< THIS IS THE RESULT OF CREATING USER >>", result)

    // if result is not null or return false if email exists
    if(result){
        // get the userDetails

        let userDetail = new UserDetails(0, rq.firstName, rq.lastName, rq.email, rq.password);
        userDetail.isLoggedIn = true; // set it to true
        userDetail.id = await database.getUserIdByEmail(rq.email);
        userDetail.emailExist = false;

        //console.log("<< creating new user:  >>", userDetail);
        res.status(200).send(JSON.stringify(userDetail));
    }else{
        res.status(400).send('{"message":"Unsuccessful Creation"}')
    }

    //const result = await database.createUser("man", "woman", "manwoman@gmail.com", "abcdefg1");
    //console.log("<< users.js >> ", rq);
});

/* without "type": "Module" in package.json
    this is the original way to do const user = require(THIS_FILE_PATH)
    module.exports = router;
*/
