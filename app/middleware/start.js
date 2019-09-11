module.exports = (req, res) => {
  res.render('start.html', {
    hideBackLink: true,
    hideSignOut: true
  });
};
