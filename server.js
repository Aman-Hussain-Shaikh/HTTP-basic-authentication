const express = require('express');
const app = express();
const path = require('path');
const auth = require('basic-auth');
const bodyParser = require('body-parser');

// Hardcoded credentials for demonstration purposes
const users = {
  'admin': { password: 'password' },
  'aman':{password:'aman'},
};

// Middleware for basic authentication
const authenticator = (req, res, next) => {
  const credentials = auth(req);

  if (!credentials || !users[credentials.name] || users[credentials.name].password !== credentials.pass) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Access to my server"');
    res.end('Access denied');
  } else {
    next();
  }
};

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse URL-encoded bodies (required for POST requests)
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.post('/login', authenticator, (req, res) => {
  res.send('Authenticated!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Below code if for authentication without html page

// const express = require('express');
// const app = express();
// const path = require('path');
// const auth = require('basic-auth');
// const bodyParser = require('body-parser'); // Add this line

// // Hardcoded credentials for demonstration purposes
// const users = {
//   'admin': { password: 'password' }
// };

// // Middleware for basic authentication
// const authenticator = (req, res, next) => {
//   const credentials = auth(req);

//   if (!credentials || !users[credentials.name] || users[credentials.name].password !== credentials.pass) {
//     res.statusCode = 401;
//     res.setHeader('WWW-Authenticate', 'Basic realm="Access to my server"');
//     res.end('Access denied');
//   } else {
//     next();
//   }
// };

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Parse URL-encoded bodies (required for POST requests)
// app.use(bodyParser.urlencoded({ extended: true })); // Add this line

// // Protected route (handle both GET and POST requests)
// app.route('/protected')
//   .get(authenticator, (req, res) => {
//     res.send('Welcome to the protected area!');
//   })
//   .post(authenticator, (req, res) => {
//     res.send('Welcome to the protected area!');
//   });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });