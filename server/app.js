////////////////////////////////////////////////////////////
//
//    Express.js Demo

////////////////////
//  Import dependencies
let express = require('express');

// Create instance of express
let app = express();

// Sophisticated back-end engineering
let visitCount = 0;

app.get('/', (req, res) => {
  // Increment Count
  visitCount++;

  // Send response:
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Express Demo</title>
  <link href="/style.css" rel="stylesheet">
</head>
<body>
  <h1>Thank you for coming to my Express.js Demo!</h1>
  <h2>Visitor #:</h2>
<pre>${visitCount}</pre>
</body>
</html>
  `);
});

// Start Server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});

/*  Staging Area

////////////////////////////////////////
//  Dependencies

let bodyParser = require('body-parser');
let morgan = require('morgan');


////////////////////////////////////////
//  Middleware
app.use(bodyParser());
app.use(morgan('dev'));

app.use(express.static('./public'));

// Custom Middleware
Time Stamp
app.use((res, req, next) => {
  console.log(`Time: ${Date(Date.now())})`);
  next();
});

Log Req
app.use((res, req, next) => {
  console.log('Request Object:', req);
  next();
});


////////////////////////////////////////
//  Api Router

app.get('/api/count', (req, res) => {
  res.json({ count: visitCount });
});

//////////////////////////////////////
 Sending Data To The Server

// Set count with * body * of http request
app.post('/api/count/', (req, res) => {
  console.log('req.body:', req.body);
  if (req.body.newCount !== undefined) visitCount = req.body.newCount;
  res.sendStatus(201);
});

Set count with * params * of http request
app.post('/api/count/:newCount', (req, res) => {
  console.log('req.params:', req.params);
  if (req.params.newCount !== undefined) visitCount = parseInt(req.params.newCount);
  res.sendStatus(201);
});

Set count with * query *
app.post('/api/count/', (req, res) => {
  console.log('req.query:', req.query);
  if (req.query.newCount !== undefined) visitCount = parseInt(req.query.newCount);
  res.sendStatus(201);
});


////////////////////////////////////////
// Express Router

let redController = (req, res) => {
  // Increment Count
  visitCount++;

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Express Demo</title>
    <link href="/style.css" rel="stylesheet">
  </head>
  <body style="background:red;">
    <h1>Thank you for coming to my Express.js Demo!</h1>
    <h2>Visitor #:</h2>
  <pre>${visitCount}</pre>
  </body>
  </html>
    `);
}

let blueController = (req, res) => {
  // Increment Count
  visitCount++;

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Express Demo</title>
    <link href="/style.css" rel="stylesheet">
  </head>
  <body style="background:blue;">
    <h1>Thank you for coming to my Express.js Demo!</h1>
    <h2>Visitor #:</h2>
  <pre>${visitCount}</pre>
  </body>
  </html>
    `);
}

let router = express.Router();

router.get('/red', redController);
router.get('/blue', blueController);

app.use('/colors', router);


////////////////////////////////////////
//  Other routes

app.get('*', (req, res) => {
  res.status(404).send('<h1><em>This</em> page was not found!</h1>');
});


*/
