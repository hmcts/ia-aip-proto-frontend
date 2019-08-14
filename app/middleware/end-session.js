module.exports = (req, res) => {
  req.session.destroy();

  res.send('Session ended');
};