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
router.get('/', async (req, res) => {
    // await - wait til the promise is resolved then set users
    const users = await database.getUsers();
    res.send(users);
});

// return specific user based on id
router.get('/:id', (req, res) => {
    res.send(`Get User With ID ${req.params.id}`);
});

// add/create a new user
router.post('/new', async (req, res) => {

    // the request comes with email and password
    let rq = req.body;

    // Angular will send data from the forms to the backend
    const result = await database.createUser(rq.firstName, rq.lastName, rq.email, rq.password); 

    // if result is not null
    if(result){
        // get the userDetails

        let userDetail = new UserDetails(rq.firstName, rq.lastName, rq.email, rq.password);
        userDetail.isLoggedIn = true; // set it to true
        res.status(200).send(JSON.stringify(userDetail));
    }else{
        res.status(400).send('{"message":"Unsuccessful Creation"}')
    }

    //const result = await database.createUser("man", "woman", "manwoman@gmail.com", "abcdefg1");
    console.log("<< users.js >> ", rq);
});

/* without "type": "Module" in package.json
    this is the original way to do const user = require(THIS_FILE_PATH)
    module.exports = router;
*/
