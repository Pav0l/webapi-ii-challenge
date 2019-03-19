const express = require('express');

// The top-level express object has a Router() method 
// that creates a new router object.
// Once you’ve created a router object, you can add middleware
// and HTTP method routes (such as get, put, post, and so on)
// to it just like an application
const routes = express.Router();

// Posts provide methods for server to retrieve data from DB
const Posts = require('./data/db');

// Initialize the req.body object
routes.use(express.json());

routes.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  }
});

routes.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);    
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
});

routes.post('/', async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const newPost = await Posts.insert(req.body);
      res.status(201).json(newPost);
    } catch {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
});

routes.delete('/:id', async (req, res) => {
  try {
    const deletedRecords = await Posts.remove(req.params.id);
    if (deletedRecords === 0) {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    } else {
      res.status(200).json(deletedRecords);
    }
  } catch {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

routes.put('/:id', async (req, res) => {
  if (req.body.title && req.body.contents) {
    try {
      const updatedPosts = await Posts.update(req.params.id, req.body);
      if (updatedPosts === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json(updatedPosts);
      }
    } catch {
      res.status(500).json({ error: "The post information could not be modified." });
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
  }
});

/*
The db.js publishes the following methods:

find(): calling find returns a promise that resolves to an array of all the posts contained in the database.
findById(): this method expects an id as it's only parameter and returns the post corresponding to the id provided or an empty array if no post with that id is found.
insert(): calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: { id: 123 }.
update(): accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
remove(): the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
*/

module.exports = routes;
