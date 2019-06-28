const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const express = require('express');
const app = express();
app.use(express.json());

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => console.log(`App is running 😃 on port ${app.get('port')}`));

app.get('/api/v1/bikes', (request, response) => {
  //get endpoint '/api/v1/bikes' and pass in the request and response
  database('bikes').select()
  //look to the database 'bikes' and select the database; the response of a select call will resolve with an array of objects selected from the database.
  .then(bikes => {
    //use the .then() method to return a Promise
    return response.status(200).json(bikes);
    //return the http status code of 200 (okay) and the request is fulfilled
  })
  .catch(error => {
    //use the .catch() method to return a Promise in rejected response case
    return response.status(500).json({ error });
    //return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
  })
});

app.get('/api/v1/bikes/:id', (request, response) => {
  //get endpoint '/api/v1/bikes/:id' and pass in the request and response
  database('bikes').where('id', request.params.id).select()
    .then(bike => {
      //use the .then() method to return a Promise
      if (bike.length) {
        //if the bike has a length (if bike exists)
        return response.status(200).json(bike);
        //return an http status code of 200 (okay) - the request is fulfilled/successful
      } else {
        return response.status(404).json({ error: `Could not find bike with id: 
          ${request.params.id}` });  
          //^^ otherwise return http status code of 404 (not found) and send an error that says that it could not find a bike with an id of the request's id that was entered
      }
    })
    .catch(error => {
      //use the .catch() method to return a Promise in rejected response case
      return response.status(500).json({ error });
       //return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
    });
});

app.get('/api/v1/countries', (request, response) => {
  //get endpoint '/api/v1/countries' and pass in the request and response
  database('countries').select()
  //look to the database 'countries' and select the database; the response of a select call will resolve with an array of objects selected from the database.
  .then((countries) => {
    //use the .then() method to return a Promise
    response.status(200).json(countries);
    //return an http status code of 200 (okay) - the request is fulfilled/successful, .then()gets resolved with the returned value as its value;
  })
  .catch((error) => {
    //use the .catch() method to return a Promise in rejected response case
    response.status(500).json({ error });
    //return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
  })
});

app.get('/api/v1/countries/:id', (request, response) => {
  //get endpoint '/api/v1/countries/:id' and pass in the request and response
  database('countries').where('id', request.params.id).select()
  //look to the database 'countries' and select the database; the response of a select call will resolve with an array of objects selected from the database.
    .then(country => {
      //use the .then() method to return a Promise
      if (country.length) {
        //if country has a length/exists
        return response.status(200).json(country);
        //return an http status code of 200 (okay) - the request is fulfilled/successful, .then()gets resolved with the returned value as its value
      } else {
        return response.status(404).json({ error: `Could not find country with id: ${request.params.id}` })
      }
      //^^ otherwise, return a http status code of 404-not found with an error message of 'could not find country with the request's id that was entered
    })
    .catch(error => {
      //use the .catch() method to return a Promise in rejected response case
      return response.status(500).json({ error });
      //return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
    });
});

app.post('/api/v1/countries', (request, response) => {
  //post endpoint '/api/v1/countries' and pass in the request and response
  const country = request.body;
  //create the variable of country and assign it to the body of the request
  for (let requiredParameter of ['country', 'city']) {
    //make the parameters (keys) of country and city required for a request 
    if (!country[requiredParameter] && !country[requiredParameter] === '') {
      //if the first and second parameters don't equal an empty string (if no parameters were entered)
      return response.status(422).send({ error: 
        //then return a http status code of 422, unprocessable entity which means that rthe server understands the content of the request however, it was unable to process the contained instructions
        `Expected format: { 
          country: <String>, city: <String>
          }. You're missing a "${requiredParameter}" property.`
        }
        //^^ send back an error message stating that the expedcted format is that both parameters are strings and that you're missing these properties
      );
    }
  }

  database('countries').insert(country, 'id')
  //^^ Looks to countries database and adds an insert query, taking either a hash of properties to be inserted into the row, or an array of inserts, to be executed as a single insert command.
    .then(country => {
      //use the .then() method to return a Promise
      response.status(201).json({ id: country[0] });
      //^^ http status code of 201 (created) and json the id key with the country at index 0 value
    })
    .catch(error => {
      //use the .catch() method to return a Promise in rejected response case
      response.status(500).json({ error });
        //return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
    });
});

app.post('/api/v1/bikes', (request, response) => {
  //post endpoint '/api/v1/countries' and pass in the request and response
  const bike = request.body;
  //create a variable of bike and assign it to the body's request
  for(let requiredParameter of ['bike_name', 'country_id']) {
    //require the parameters of bike_name and country_id
    if (!bike[requiredParameter] && !bike[requiredParameter] === '') {
      return response.status(422).send({ error: 
        //^^if there is not bike with the first required parameter and second required parameter equal to an empty string, send and http status code of 422, unprocessable entity which means that rthe server understands the content of the request however, it was unable to process the contained instructions
        `Expected format: {
          bike_name: <String>, country_id: <Integer>
          }. You're missing a "${requiredParameter}" property.`
        }
        //^^ error message stating that they're missing the required parameter property of the country_id which is a number or bike_name which is a string
      );
    }
  }
      database('bikes').insert(bike, 'id')
      //^^ Looks to bikes database and adds an insert query, taking either a hash of properties to be inserted into the row, or an array of inserts, to be executed as a single insert command.
        .then(bike => {
          response.status(201).json({ id: bike[0] });
          //^^ http status code of 201 (created) and json the id key with the bike at index 0 value
        })
        .catch(error => {
          response.status(500).json({ error })
           //^^ return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
        });
    });
    
    app.delete('/api/v1/countries/:id', (request, response) => {
       //post endpoint '/api/v1/countries/:id' to target the specific id and pass in the request and response
      database('countries').where('id', request.params.id).del()
      //^^ looks to countries database countries and sets the condition where the parameters of the request has an id, delete that request
        .then(result => {
          if (result > 0) {
            //^^ if the result is greater than 0 
            response.status(200).json(`Deleted country '${request.body.country}' with id ${request.params.id}`)
              //return an http status code of 200 (okay) - the request is fulfilled/successful, .then()gets resolved with the returned value as its value and message states that body of the request was deleted with the id of the request's parameters id
          } else {
            response.status(404).json({
              error: `Could not find country with an id: ${request.params.id}`
              //^^ otherwise, return a http status code of 404 - not found with an error message of 'could not find country with the request's id that was entered
            })
          }
        })
        .catch(error => {
          response.status(500).json({ error })
          //^^ return the http status code of 500 - internal server error, the server encountered an unexpected condition that prevented it from fulfilling the request
        });
    });

