const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log(`App is running 😃 on port ${app.get('port')}`));

app.get('/api/v1/bikes', (request, response) => {
  database('bikes').select()
  .then((bikes) => {
    response.status(200).json(bikes);
  })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.get('/api/v1/countries', (request, response) => {
  database('countries').select()
  .then((countries) => {
    response.status(200).json(countries);
  })
  .catch((error) => {
    response.status(500).json({ error });
  })
});

app.post('/api/v1/bikes', (request, response) => {
  const bike = request.body;

  for (let requiredParameter of ['country', 'name']) {
    if (!bike[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { country: <String>, name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('bikes').insert(bike, 'id')
    .then(bike => {
      response.status(201).json({ id: bike[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});