module.exports = (req, res) => {
  const email = req.body.email;
  res.render('idam/check-your-email.html', {
    hideBackLink: true,
    hideSignOut: true,
    email
  });
};
