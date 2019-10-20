module.exports = (req, res) => {
  const obj = {
    arr: [{ fileName: req.body.evidenceUpload, description: req.body.evidenceDescription }]
  };
  res.render('appeal-out-of-time.html', obj);
};
