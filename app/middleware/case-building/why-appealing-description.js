module.exports = (req, res) => {
  res.render('case-building/why-appealing-description.html', {
    hideBackLink: false,
    previousPage: '/case-building/overview'
  });
};
