const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5432);
app.locals.title = 'Space Truckers API';

app.get('/', (request, response) => {
  response.send('Welcome to Space Truckers API, the new Wild West');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
