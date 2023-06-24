const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

// example of a middleware
// app.use((request, response, next) => {
//   request.appId = 'MyAppId';
//   response.send('intercepted by the middleware');
// });

// we're going to allow the express to work with JSON
app.use(express.json());
app.use(routes);

// this is the declaration of our middleware for the `error handler`
// it needs to come AFTER the definition of the `ROUTES` because in this way will be able to handle the erros
app.use((error, request, response, next) => {
  console.log('### ERROR HANDLER');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
