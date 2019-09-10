module.exports = (req, res) => {
  res.render('idam/register.html', {
    hideBackLink: true,
    hideSignOut: true
  });
};
