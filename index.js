const app = require('./server');

const port = 1999;
app.listen(port, () => {
  console.log(`The app is listening at http://localhost:${port}`)
})