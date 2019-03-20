let express = require('express');

let app = express();

app.get('/', (req, res) => {
  res.send('Hello, welcome to my site');
})

app.listen(8000,() => {
  console.log('Server running on http://localhost:8000');
})