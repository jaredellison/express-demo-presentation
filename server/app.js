////////////////////////////////////////////////////////////
//
//    Express.js Demo

////////////////////
//  Import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Create an instance of express
const app = express();

// Sophisticated back-end engineering to count page views (since visitCount is
// stored in memory it will reset every time the server restarts)
let visitCount = 0;

////////////////////////////////////////
//  Apply middlware

// Other express middleware:
// https://expressjs.com/en/resources/middleware.html

// Creating req.body with any key value pairs sent in an HTTP request body
app.use(bodyParser.json());
// Logging each server request
app.use(morgan('dev'));

// Serve static files:

// Note that __dirname refers to the directory where this file is SAVED while
// the path './' refers to the directory where this file is RUN, which could be
// from anywhere in your file system.
// console.log('"." path:', path.resolve('.'));
// console.log('__dirname:', __dirname);
// console.log(`path.join(__dirname, '/public'):`, path.join(__dirname, '../public') );

app.use(express.static(path.join(__dirname, '../public')));

////////////////////////////////////////
// Custom Middleware

// Beyond logging, custom middleware can be useful for inspecting and decorating
// the request object to implement authorization, etc

// // Log the request object (watch out, it's enormous!)
// app.use((res, req, next) => {
//   console.log('Request Object:', req);
//   next();
// });

// // Log a timestamp with each request
// app.use((res, req, next) => {
//   console.log('Time:', Date(Date.now()));
//   next();
// });

// Serve a string of html at the root endpoint
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
  <h1>Thank you for coming to my Express.js demo!</h1>
  <h2>Visitor #:</h2>
<pre>${visitCount}</pre>
</body>
</html>
  `);
});


////////////////////////////////////////
//  API Routes

// Access json representing the count
app.get('/api/count', (req, res) => {
  res.json({ count: visitCount });
});

// 3 Different ways to set the count using an HTTP request:

// // Set count with * body * of http request - note that bodyParser or express.json middleware
// // will be required for this to work: https://expressjs.com/en/4x/api.html#express.json
// // For example: POST http://localhost:8000/api/count/ with content-type
// app.post('/api/count/', (req, res) => {
//   console.log('req.body:', req.body);
//   if (req.body.newCount !== undefined) visitCount = req.body.newCount;
//   res.sendStatus(201);
// });

// // Set count with * params * of http request
// // For example: POST http://localhost:8000/api/count/?newCount=100
// app.post('/api/count/:newCount', (req, res) => {
//   console.log('req.params:', req.params);
//   if (req.params.newCount !== undefined) visitCount = parseInt(req.params.newCount);
//   res.sendStatus(201);
// });

// // Set count with * query *
// // For example: POST http://localhost:8000/api/count/?newCount=1000000
// app.post('/api/count/', (req, res) => {
//   console.log('req.query:', req.query);
//   if (req.query.newCount !== undefined) visitCount = parseInt(req.query.newCount);
//   res.sendStatus(201);
// });


////////////////////////////////////////
// Express Router

// Controller functions written in the express callback pattern
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
    <h1>Thank you for coming to my Express.js demo!</h1>
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
    <h1>Thank you for coming to my Express.js demo!</h1>
    <h2>Visitor #:</h2>
  <pre>${visitCount}</pre>
  </body>
  </html>
    `);
}

// Get an instance of the express router
let colorRouter = express.Router();

// Specify routes to be handled by the colorRouter
colorRouter.get('/red', redController);
colorRouter.get('/blue', blueController);

// Use the colorRouter to handle any requests that begin with '/colors' such as
// 'http//localhost:8000/colors/red'
app.use('/colors', colorRouter);


// Handle any requests that are not handled by other paths using the wildcard '*' character
// see https://expressjs.com/en/guide/routing.html#route-paths
// and https://regexr.com/
// for more details...
app.get('*', (req, res) => {
  res.status(404).send('<h1><em>This</em> page was not found!</h1>');
});

// Start Server
app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
