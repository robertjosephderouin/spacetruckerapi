const express = require('express');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Space Truckers API';

app.get('/api/v1/jobs', async (request, response) => {
  try {
    const jobs = await database('jobs').select();
    response.status(200).json(jobs);
  } catch(error) {
    response.status(500).json({ error });
  }
});

// app.delete('/api/v1/jobs', async (request, response) => {
//
//
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
