const express = require('express');
const app = express();

const port = 1999;
app.listen(port, () => {
  console.log(`The app is listening at http://localhost:${port}`)
})