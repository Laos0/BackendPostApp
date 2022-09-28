/*
    This file will listen to requests on port 8080 from clients
    and the router will respond accordingly
*/

import express, { Router } from 'express';
import { router as userRouter } from './routes/users.js';
import { router as authRouter } from './routes/auth.js';
import { apiPaths } from './apiVersion/apiPaths.js';
import cors from 'cors';


/* ** TODO ** 
    Need to create a file to hold enum for api so we can set string to 
    const api = "/api/v1/users"
*/

/* 
    Without the "type": "module" in package.json
    this would be the original way of importing
        const express = require('express');
*/

const app = express();
const port = 8080;
app.use(cors());

// a middleware: this will allow us to send json from frontend to here
// without express.json(), our req.body will be {} 
app.use(express.json())  
//app.use(express.urlencoded({ extended: false})); 


// allow us to use our apis from user router
//const userRouter = require('./routers/users');

/* doing this so we dont have to keep saying users in the beginning in users.js
    app.get('/users')
    app.post('/users/new')
*/
app.use(apiPaths.API_USER_V1, userRouter); // path: http://localhost:8080/api/v1/users
app.use(apiPaths.API_LOGIN_V1, authRouter); // path: http://localhost:8080/api/v1/auth


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke');
}),

app.listen(port);

