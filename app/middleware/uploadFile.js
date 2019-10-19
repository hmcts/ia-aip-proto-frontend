
module.exports = (req, res) => {
  const obj = {
    file: req.body.file,
    whatIsIt: req.body['file-upload']
  };
  res.render('appeal-out-of-time.html', obj);
};

// function getCcdQuestions(req, res) {
//   if (req.query['edit-question']) {
//     const questionId = req.query['edit-question'];
//     const question = req.session.appealData.questions[questionId];
//     return res.render('ccd/edit-clarifying-questions.html', { question });
//   }
//   const questions = req.session.appealData.questions || [];
//   return res.render('ccd/new-clarifying-questions.html', { questions });
// }
