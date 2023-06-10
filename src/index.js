const express = require('express');
const routes = require('./routes');

const app = express();

// example of a middleware
// app.use((request, response) => {
//   request.appId = 'MyAppId';
//   response.send('intercepted by the middleware');
// });

// we're going to allow the express to work with JSON
app.use(express.json());

app.use(routes);

app.listen(3000, () => console.log('🔥 Server started at http://localhost:3000'));
