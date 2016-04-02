module.exports = function subjectsController(
    models
  ) {

  var allSubjects = function (req, res) {
    var response = {};

    models.subject.fetchAll()
     .then(function ( subjects ) {
       response = {error: false, subjects: subjects};
       res.send(response);
     })
    .catch(function ( err) { 
      response = {error: true, payload: err.message};
      res.send(response);
    });
  }

  var userSubjects = function (req, res) {
    var user_id = req.params.user_id;

    response = {};

    models.user.where({id: user_id}).fetch({withRelated: [ 'subjects' ]})
    .then(function ( user ) {
      response = {error: false, subjects: user.related('subjects')};
      res.send(response);
    })
    .catch(function(err) {
        response = {error: true, payload: err.message};
        res.send(response);
    });
  }


  return {
    userSubjects,
    allSubjects
  }
}

