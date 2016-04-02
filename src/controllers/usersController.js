module.exports = function usersController(
    models
) {
  var showUser = function (req, res) {
    var user_id = req.params.id;

    response = {};

    var user = models.user.where({id: user_id}).fetch()
      .then(function (user) {
        if (user == null ) {
          response = {error: true, payload: "No user found with id: " + user_id};
          res.send(response);
        } else {
          response = {error: false, user: user}
          res.send(response);
        }
      }).catch(function (err) {
        response = {error: true, payload: err.message};
        res.send(response);
      });
  }
  return {
    showUser
  }
}
