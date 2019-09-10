module.exports = (req, res) => {
  req.session.appealData.accountCreated.completed = true;
  res.render('idam/account-created.html', {
    hideBackLink: true,
    hideSignOut: true
  });
};
