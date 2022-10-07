import * as database from '../database.js';
import express from 'express';
import { UserDetails } from '../responses/UserDetails.js';

export const router = express.Router();

// loginTest
router.get('/loginTest', async (req, res) => {
    res.send("Logging in");
    //console.log("HIT")
});

// Frontend will call this endpoint and send in email and password data
router.post('/login', async (req, res) => {

    let responseLogin = await database.login(req.body.email, req.body.password);

    // layer ResponseLogin: isQueryGood->emailExist->passwordMatch->isLoggedIn

    // if the query is good
    if(responseLogin.isQueryGood){
        // if the email exists
        if(responseLogin.emailExist){
            // if the password matches
            if(responseLogin.passwordMatch){
                // if the user successfully loggedin
                if(responseLogin.isLoggedIn){
                    let user = await database.getUserDetailsByEmail(req.body.email); 
                    
                    // when extracting data, make sure to spell the fields correctly like it was in the backend mysql: 
                    // ex: data table user's field: first_name, last_name...
                    let userDetails = new UserDetails(user[0].id, user[0].first_name, 
                        user[0].last_name, user[0].email, user[0].password,
                        responseLogin.isLoggedIn, responseLogin.emailExist, responseLogin.passwordMatch, responseLogin.isQueryGood);
                    //console.log("<< auth.js >>", user[0]); 

                    userDetails.isLoggedIn = true;
                    userDetails.id = await database.getUserIdByEmail(req.body.email);
                    //console.log("<< user ID >>", userDetails.id);
                    res.send(JSON.stringify(userDetails));
                }
            }else{
                // if the password did not match
                res.send(responseLogin);
            }
        }else{
            // if the email does not exist
            res.send(responseLogin);
        }
    }else{
        // if the query is bad
        console.log("THE QUERY FOR LOGIN IS BAD")
    }
}); 