module.exports = function answersController(
    models
  ) {

  var showAnswer = function (req, res) {
    var answer_id = req.params.id;

    response = {};

    var answer = models.answer.where({id: answer_id}).fetch()
      .then(function (answer) {
        if (answer == null ) {
          response = {error: true, payload: "No answer found with id: " + answer_id};
          res.send(response);
        } else {
          response = {error: false, answer: answer}
          res.send(response);
        }
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  var createAnswer = function (req, res) {
    var question_id = req.params.question_id;

    var answer = {
      user_id: req.body.user_id,
      question_id: question_id,
      state: req.body.state,
    }

    response = {};
  
    models.answer.forge(answer).save()
      .then(function (answer) {
        response = {error: false, answer: answer};
        res.send(response);
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  var updateAnswer = function (req, res) {
    var answer_id = req.params.id;
    var answer = req.body;

    response = {};
  
    models.answer.where({id: answer_id})
      .save(answer, {patch: true})
      .then(function (answer) {
        response = {error: false, answer: answer};
        res.send(response);
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  return {
    showAnswer,
    createAnswer,
    updateAnswer
  }
}

