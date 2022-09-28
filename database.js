// This file allows us to connect to MySql database
// and we do query here to CRUD data in database

import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import {getQueries} from './libs/queries/queries.js'
dotenv.config();


// this is how you connect to mysql database
// to change the values, visit the .env file
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_ROOT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

// an async function returns a promise
// await key term can be used within async functions
// await = wait untilt the promise resolves
export async function getUsers(){ 
    // the [users] will return only the first item in the array 
    // without it, we will get the users and all unnecessary meta data 
    const [users] = await pool.query("SELECT * FROM user");
    return users;
}

export async function createUser(firstName, lastName, email, password){
    const result = await pool.query(`
        INSERT INTO user (first_name, last_name, email, password)
        VALUES (?, ?, ?, ?)`, 
        [firstName, lastName, email, password])
        return result;
}

export async function login(email, password){


    const sql = `SELECT password FROM user WHERE email="${email}"`;

    let pass;

    try{
        // query to get the password from email
        // gotta use the brackets to get the json object otherwise we get meta-data with it
        [pass] = await pool.query(sql);

    }catch(e){
        // when there is an error on the query
        console.log("invalid query")
        return false
    }

    if(pass[0]){
        
        if(password === pass[0].password){
            return true;
        }else{
            console.log("password does not match")
            return false;
        } 

    }else{
        console.log("Email does not exist")
        return false;
    }

    


    // this is how you extract data value from a json object
   //console.log(pass[0].password);

}