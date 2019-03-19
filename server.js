const express = require('express');
// improt middleware
const postRoutes = require('./routes');

const app = express();
const routeURL = '/api/posts';

// Mounts the specified middleware function or functions
// at the specified path: the middleware function is executed
// when the base of the requested path matches path.
app.use(routeURL, postRoutes);

module.exports = app;
