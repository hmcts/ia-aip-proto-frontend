module.exports = (req, res) => {
  const signInLink = req.query.signInLink ? req.query.signInLink : '/start';

  res.render('idam/sign-in.html', {
    hideBackLink: true,
    signInLink
  });
};
