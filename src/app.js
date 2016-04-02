var express     =   require("express");
var bodyParser  =   require("body-parser");

module.exports = function $app(
  usersController,
  questionsController,
  answersController,
  commentsController,
  subjectsController,
  db,
  models
) {
  var app = express();
  var router = express.Router();
  // Pre-Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({"extended" : false}));


  router.route("/users/:id")
    .get(usersController.showUser);

  router.route("/users/:user_id/questions")
    .post(questionsController.createQuestion);

  router.route("/users/:user_id/questions/index")
    .get(questionsController.userQuestions);
  router.route("/users/:user_id/answers/index")
    .get(answersController.userAnswers);

  router.route("/questions/search")
    .get(questionsController.searchQuestions);

  router.route("/questions/:id")
    .get(questionsController.showQuestion);
  router.route("/questions/:question_id/answers")
    .post(answersController.createAnswer);
  router.route("/users/:user_id/questions/:id")
    .put(questionsController.updateQuestion);

  router.route("/answers/:id")
    .get(answersController.showAnswer);
  router.route("/users/:user_id/answers/:id")
    .put(answersController.updateAnswer);

  router.route("/answers/:answer_id/comments")
    .post(commentsController.createComment);
  router.route("/answers/:answer_id/comments/index")
    .get(commentsController.answerComments);

  router.route("/subjects/index")
    .get(subjectsController.allSubjects);

  router.route("/users/:user_id/subjects/index")
    .get(subjectsController.userSubjects);

  router.route("/comments/:id")
    .get(commentsController.showComment);

  // Post-Middleware
      
  app.use('/',router);

  return app;
}
