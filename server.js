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
  .then(bikes => {
    return response.status(200).json(bikes);
  })
  .catch(error => {
    return response.status(500).json({ error });
  })
});

app.get('/api/v1/bikes/:id', (request, response) => {
  database('bikes').where('id', request.params.id).select()
    .then(bike => {
      if (bike.length) {
        return response.status(200).json(bike);
      } else {
        return response.status(404).json({ error: `Could not find bike with id: ${request.params.id}` });  
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
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

app.get('/api/v1/countries/:id', (request, response) => {
  database('countries').where('id', request.params.id).select()
    .then(country => {
      if (country.length) {
        return response.status(200).json(country);
      } else {
        return response.status(404).json({ error: `Could not find country with id: ${request.params.id}` })
      }
    })
    .catch(error => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/bikes', (request, response) => {
  const bike = request.body;
  for (let requiredParameter of ['country', 'name']) {
    if (!bike[requiredParameter]) {
      return response.status(422).send({ error: 
        `Expected format: { 
          country: <String>, name: <String>
          }. You're missing a "${requiredParameter}" property.`
        }
      );
    }
  }

  database('bikes').insert(bike, 'id')
    .then(bike => {
      response.status(201).json({ id: bike[0] });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});