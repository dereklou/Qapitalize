module.exports = function models(
    db
    ) {
  var user = db.bookshelf.Model.extend({
    tableName: 'users',
    questions: function() {
      return this.hasMany(question);
    },
    answers: function() {
      return this.hasMany(answer);
    },
    comments: function() {
      return this.hasMany(comment);
    },
    subjects: function() {
      return this.belongsToMany(subject);
    },
  });

  var question = db.bookshelf.Model.extend({
    tableName: 'questions',
    hasTimestamps: true,
    user: function() {
      return this.belongsTo(user);
    },
    subject: function() {
      return this.belongsTo(subject);
    },
    answers: function() {
      return this.hasMany(answer);
    },
  });

  var answer = db.bookshelf.Model.extend({
    tableName: 'answers',
    hasTimestamps: true,
    user: function() {
      return this.belongsTo(user);
    },
    question: function() {
      return this.belongsTo(question);
    },
    comments: function() {
      return this.hasMany(comments);
    },
  });


  var comment = db.bookshelf.Model.extend({
    tableName: 'comments',
    hasTimestamps: true,
    user: function() {
      return this.belongsTo(user);
    },
    answer: function() {
      return this.belongsTo(answer);
    },
  });

  var subject = db.bookshelf.Model.extend({
    tableName: 'subjects',
    users: function() {
      return this.belongsTo(user);
    },
    questions: function() {
      return this.hasMany(question);
    },
    users: function() {
      return this.belongsToMany(user);
    },
  });

  return {
    user,
    question,
    answer,
    subject,
    comment
  }
}
