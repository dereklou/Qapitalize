module.exports = function questionsController(
    db,
    models
  ) {

  var userQuestions = function (req, res) {
    var user_id = req.params.user_id;

    response = {};

    models.user.where({id: user_id}).fetch({withRelated: [
      {
        'questions': function(qb) {
          qb.orderBy("updated_at", "desc");
        }
      }
    ]})
    .then(function ( user ) {
      response = {error: false, questions: user.related('questions')};
      res.send(response);
    })
    .catch(function(err) {
        response = {error: true, payload: err.message};
        res.send(response);
    });
  }

  var searchQuestions = function (req, res) {
    var subjects = req.query.subjects.split(',');
    var response = {};
    models.question.where("subject_id", "in", subjects).fetchAll()
      .then(function (questions) {
        response = {error: false, questions: questions};
        res.send(response);
      })
      .catch(function(err) {
          response = {error: true, payload: err.message};
          res.send(response);
      });

  }

  var showQuestion = function (req, res) {
    var question_id = req.params.id;

    response = {};

    var question = models.question.where({id: question_id}).fetch()
      .then(function (question) {
        if (question == null ) {
          response = {error: true, payload: "No question found with id: " + question_id};
          res.send(response);
        } else {
          response = {error: false, question: question};
          res.send(response);
        }
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  var createQuestion = function (req, res) {
    var user_id = req.params.user_id;

    var question = {
      user_id: user_id,
      subject_id: req.body.subject_id,
      title: req.body.title,
      text: req.body.text,
      bounty: req.body.bounty,
      deadline: req.body.deadline
    }

    response = {};
  
    models.question.forge(question).save()
      .then(function (question) {
        response = {error: false, question: question};
        res.send(response);
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });

  }

  var updateQuestion = function (req, res) {
    var question_id = req.params.id;
    var question = req.body;
    response = {};
  
    models.question.where({id: question_id})
      .save(question, {patch: true})
      .then(function (question) {
        response = {error: false, question: question};
        res.send(response);
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  return {
    showQuestion,
    createQuestion,
    updateQuestion,
    userQuestions,
    searchQuestions
  }
}
