const bikeData = require('../../../data.js');

const createCountry = (knex, country) => {
  return knex('countries').insert(country);
};

exports.seed = (knex, Promise) => {
  return knex('countries').del()
  .then(() => knex('bikes').del())
  .then(() => {
    let bikePromises = [];

    bikeData.forEach(bike => {
      bikePromises.push(createBike(knex, bike));
    });

    return Promise.all(bikePromises);
  })
  .catch(error => console.log(`Error seeding data: ${error}`));
};

const createBike = (knex, bike) => {
  return knex('bikes').insert({
    name: bike.bikes,
    country: bike.country
  }, 'id')
  .then(bikeId => {
    let countryPromises = [];

    bikeData.forEach(country => {
      countryPromises.push(
        createCountry(knex, {
          country: country.country,
          bike_id: bikeId[0]
        })
      )
    });

    return Promise.all(countryPromises);
  })
};

