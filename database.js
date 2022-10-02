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

export async function getAllPosts(){
    const [posts] = await pool.query("SELECT * FROM post");
    return posts;
}

export async function updatePostViews(post){
    const [updatePost] = await pool.query(`UPDATE post SET views = views + 1 WHERE post.id=${post.id}`);
    return updatePost;
    //console.log(updatePost);
}

export async function getUserDetailsById(id){
    const [user] = await pool.query(`SELECT * FROM user WHERE id=${id}`);
    console.log("THIS IS THE USER:", user[0]);
    return user;
}

export async function getUserIdByEmail(email){ 
    // the [users] will return only the first item in the array 
    // without it, we will get the users and all unnecessary meta data 
    const [userId] = await pool.query(`SELECT id FROM user WHERE email="${email}"`);
    return userId[0].id;
}


export async function getUserDetailsByEmail(email){
    const [users] = await pool.query(`SELECT * FROM user WHERE email="${email}"`);
    console.log("<< Database.js >>", users);
    return users;
}

// sql to insert a new user
export async function createUser(firstName, lastName, email, password){

    const sql = `INSERT INTO user (first_name, last_name, email, password)
    VALUES (?, ?, ?, ?)`;

    try{

        // no need to include the id because it is set to auto_increment on mysql database
        const [result] = await pool.query(sql, 
            [firstName, lastName, email, password]);
        console.log("<< After creating user >>", result);
            return result;

    }catch(e){
        return false;
    }
}

// gets the email and password from our auth router in auth.js
export async function login(email, password){

    const sql = `SELECT password FROM user WHERE email="${email}"`;

    let pass;

    try{
        // query to get the password from email
        // gotta use the brackets to get the json object otherwise we get meta-data with it
        [pass] = await pool.query(sql);

    }catch(e){
        // when there is an error on the query
        console.log("invalid query");
        return false
    }

    // check to make sure pass is not empty
    if(pass[0]){
        
        if(password === pass[0].password){
            return true;
        }else{
            console.log("password does not match")
            return false;
        } 

    }else{
        // if password is not assigned through query then 
        // there is no match for email
        console.log("Email does not exist")
        return false;
    }

}


export async function post(userId, title, text, views){
    const sql = `INSERT INTO post (userId, title, text, views)
    VALUES (?, ?, ?, ?)`;

    try{
        const [result] = await pool.query(sql, 
            [userId, title, text, views]);

            // if the creation is good
            return true;

    }catch(e){
        console.warn(e);
        // if the sql is bad
        return false;
    }

    console.log("<< POST COMPLETED >> ", result);
}