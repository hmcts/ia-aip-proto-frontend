module.exports = (req, res) => {
  req.session.appealData.testWork = {
    file: req.body.file,
    whatIsIt: req.body['file-upload']
  };

  const obj = {
    file: req.session.appealData.testWork.file,
    whatIsIt: req.session.appealData.testWork.whatIsIt
  };
  res.render('appeal-out-of-time.html', obj);
};
