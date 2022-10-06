import * as database from '../database.js';
import express from 'express';


export const router = express.Router();

router.get('/', async (req, res) => {
 
    //console.log("Posting TEst wokring")
});

router.post('/:id/comment', async (req, res) => {
    const result = await database.getAllCommentInPost(req.body);
    res.send(result)
    //console.log(result);
})

router.post('/:id/comments/new', async (req, res) => {
    const result = await database.addNewCommentToPost(req.body);
    if(result){
        res.send({"isCommentCreated": result});
    }else{
        res.send({"isCommentCreated": result});
    }

    console.log(req.body);
})

// Frontend will call this endpoint and send in the userId, title, textField, and views
router.post('/new', async (req, res) => {
    //console.log("<< post.js >> ", req.body);

    const data = req.body;

    let result = await database.post(data.userId, data.title, data.text, data.views);

    res.send(result);
}); 

router.get('/all', async (req, res) => {
    //console.log("Getting all posts...")

    let posts = await database.getAllPosts();
    res.send(posts);
});

router.post('/id/addViews', async (req, res) => {
    console.log(req.body);
    let result = await database.updatePostViews(req.body);
    res.send({"message": "view count increased"});
    //console.log(req.body);
    console.log("adding views")
});

router.delete('/:id/delete', async (req, res) => {
    //console.log("Deleting post of id: ", req.params.id);
    let result = await database.deletePostById(req.params.id);
    res.send({some: 'json'});

});

router.put('/:id/edit', async (req, res) => {
    //console.log("Editing post....", req.body);
    let result = await database.editPostById(req.body);
    res.send({message: true});
})