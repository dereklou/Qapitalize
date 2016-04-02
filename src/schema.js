var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : 'localhost',
    user     : 'naseem.alnaji',
    database : 'qapitalize',
    charset  : 'utf8'
  }
});

var bookshelf = require('bookshelf')(knex);

Promise.all([
  bookshelf.knex.schema.createTable('users', function(t) {
    t.increments('id').primary();
    t.string('name');
    t.string('email').unique();
  }),
  bookshelf.knex.schema.createTable('subjects', function(t) {
    t.increments('id').primary();
    t.string('name');
  }),
  bookshelf.knex.schema.createTable('questions', function(t) {
    t.increments('id').primary();
    t.string('title');
    t.string('text');
    t.decimal('bounty', 11, 2);
    t.timestamps();
    t.dateTime('deadline');
   
    t.integer('subject_id');
    t.integer('user_id');

    // TODO: Images
  }),
  bookshelf.knex.schema.createTable('answers', function(t) {
    t.increments('id').primary();
    t.integer('state');
    t.timestamps();

    t.integer('question_id');
    t.integer('user_id');
  }),
  bookshelf.knex.schema.createTable('comments', function(t) {
    t.increments('id').primary();
    t.string('text');
    t.timestamps();

    t.integer('user_id');
    t.integer('answer_id');
    // TODO: Images
  }),

  // JOIN TABLES
  bookshelf.knex.schema.createTable('subjects_users', function(t) {
    t.increments('id').primary();
    t.integer('user_id');
    t.integer('subject_id');
  })
]);
