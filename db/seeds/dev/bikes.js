const bikeData = require('../../../data.js');

exports.seed = function(knex, Promise) {
  return knex('bikes').del()
  .then(() => knex ('bikes').del())

  .then(() => {
    //create relationship for all bikes per one country...am I doing this right?
    return Promise.all([
      knex('bikes').insert({
        country: 'CA',
        name: 'CoolestBike'
      }, 'id')

      .then(bike => {
        return knex('bikes').insert([
          {bike: 'New Bike', bike_id: bike[0]},
          {bike: 'Newer Cooler Bike', bike_id: bike[0]}
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => `There is an error with seeding bikes, ${error}`)
    ])
  }).catch(error => console.log(`Error seeding data: ${error}`))
};
