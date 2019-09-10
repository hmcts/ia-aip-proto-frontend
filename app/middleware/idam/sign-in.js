module.exports = (req, res) => {
  const signInLink = req.query.signInLink ? req.query.signInLink : '/task-list';

  res.render('idam/sign-in.html', {
    hideBackLink: true,
    signInLink,
    hideSignOut: true
  });
};
