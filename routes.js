const express = require('express');

// The top-level express object has a Router() method 
// that creates a new router object.
// Once you’ve created a router object, you can add middleware
// and HTTP method routes (such as get, put, post, and so on)
// to it just like an application
const routes = express.Router();

// Posts provide methods for server to retrieve data from DB
const Posts = require('./data/db');

routes.use(express.json());

routes.get('/', async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "The posts information could not be retrieved." });
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
