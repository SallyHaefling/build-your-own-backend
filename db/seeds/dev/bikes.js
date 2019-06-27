const bikeData = require('../../../data.js');

const createBike = (knex, bike) => {
  return knex('bikes').insert(bike);
};

exports.seed = (knex, Promise) => {
  return knex('bikes').del()
  .then(() => knex('countries').del())
  .then(() => {
    let countryPromises = [];

    bikeData.forEach(country => {
      countryPromises.push(createCountry(knex, country));
    });

    return Promise.all(countryPromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};

const createCountry = (knex, country) => {
  return knex('countries').insert({
    city: country.city,
    country: country.country
  }, 'id')
  .then(countryId => {
    let bikePromises = [];

    country.bikes.forEach(bike => {
      bikePromises.push(
        createBike(knex, {
          bike_name: bike,
          country_id: countryId[0]
        })
      )
    });

    return Promise.all(bikePromises);
  })
};

