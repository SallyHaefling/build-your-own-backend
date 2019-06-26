// 1. Load the JSON data from each data file
// 2. Create a knex seed (and export it)
// 3. Delete any existing data in all of the tables
// 4. Seed all of the countries first because we need the primary key to exist as a foreign key for each bike (will be doing one-to-many, one country and all of that country's bikes)
// 5. Seed each bike
//   - Create an empty array where each promise will go
//   - Find the country 'id' for the current bike being inserted
//   - Insert the bike with the country 'id' as the foreign key
// 6. Resolve all of the bike's promises

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

