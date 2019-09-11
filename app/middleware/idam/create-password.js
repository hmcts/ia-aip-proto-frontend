module.exports = (req, res) => {
  res.render('idam/create-password.html', {
    hideBackLink: true,
    hideSignOut: true
  });
};
