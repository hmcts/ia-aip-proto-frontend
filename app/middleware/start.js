module.exports = (req, res) => {
  req.session.appealData = {
    yourDetails: {
      homeOffice: {
        completed: false
      },
      personalDetails: {
        completed: false
      },
      contactDetails: {
        completed: false
      }
    },
    appealDetails: {
      typeOfAppeal: {
        completed: false
      },
      reasonsForAppeal: {
        completed: false
      }
    }
  };
  res.render('start.html');
};
