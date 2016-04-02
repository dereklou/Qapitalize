module.exports = function db() {
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
    

	return {
		bookshelf
	}
}
