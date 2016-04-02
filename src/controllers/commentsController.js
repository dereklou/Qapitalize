module.exports = function commentsController(
    models
  ) {

  var showComment = function (req, res) {
    var comment_id = req.params.id;

    response = {};

    var comment = models.comment.where({id: comment_id}).fetch()
      .then(function (comment) {
        if (comment == null ) {
          response = {error: true, payload: "No comment found with id: " + comment_id};
          res.send(response);
        } else {
          response = {error: false, comment: comment}
          res.send(response);
        }
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  var answerComments = function (req, res) {
    var answer_id = req.params.answer_id;

    response = {};

    models.answer.where({id: answer_id}).fetch({withRelated: [
      {
        'comments': function(qb) {
          qb.orderBy("created_at");
        }
      }
    ]})
    .then(function ( answer ) {
      response = {error: false, comments: answer.related('comments')};
      res.send(response);
    })
    .catch(function(err) {
      console.error(err);
        response = {error: true, payload: err.message};
        res.send(response);
    });
  }

  var createComment = function (req, res) {
    var answer_id = req.params.answer_id;

    var comment = {
      user_id: req.body.user_id,
      answer_id: answer_id,
      text: req.body.text
    }

    response = {};
  
    models.comment.forge(comment).save()
      .then(function (comment) {
        response = {error: false, comment: comment};
        res.send(response);
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }

  return {
    showComment,
    createComment,
    answerComments
  }
}

