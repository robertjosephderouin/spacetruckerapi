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
    response.status(500).json({ error: error.message });
  }
});

app.delete('/api/v1/jobs/:id', async (request, response) => {
 try {
  const selectedJob = await database('jobs').where( {id: request.params.id }).del();
  response.status(200).json({ success: true })
  } catch(error) {
  response.status(500).json({ error: error.message });
  }
});

app.patch('/api/v1/jobs/:id', async (request, response) => {
  try {
    const modifyJob = await database('jobs').where( {id: request.params.id }).update(request.body).returning('*');
    response.status(200).json({ success: true })
  } catch(error) {
    response.status(500).json({ error: error.message });
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
