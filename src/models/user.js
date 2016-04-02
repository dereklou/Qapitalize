module.exports = function user(
  db
) {
  var user = db.bookshelf.Model.extend({
    tableName: 'users',
//    questions: function() {
//      return this.hasMany(Question);
//    },
//    answers: function() {
//      return this.hasMany(Answer);
//    },
//    comments: function() {
//      return this.hasMany(Comment);
//    }
  });

  return {
    user
  }
}
