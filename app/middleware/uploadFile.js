
module.exports = (req, res) => {
  const obj = {
    name: req.body.file,
    whatIsIt: 'Document'
  };
  res.render('appeal-out-of-time.html', obj);
};
