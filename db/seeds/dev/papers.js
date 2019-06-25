
exports.seed = function(knex, Promise) {
  return knex('footnotes').del()
  .then(() => knex('papers').del())
  
  .then(() => {
    return Promise.all([
      knex('papers').insert({
        title: 'Living in the basement', author: '1901',
        publisher: 'Turing Books'
      }, 'id')

      .then(paper => {
        return knex('footnotes').insert([
          {note: 'Hip Hip', paper_id: paper[0]},
          {note: 'Hooray', paper_id: paper[0]}
        ])
      })
      .then(() => console.log('Seeding complete!'))
      .catch(error => `There is an error with seeding footnotes, ${error}`)
    ])
  }).catch(error => console.log(`Error seeding data: ${error}`))
};
