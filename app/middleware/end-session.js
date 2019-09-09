const paths = require('../paths');

module.exports = (req, res) => {
  req.session.destroy();

  res.redirect(paths.flow);
};
