module.exports = (req, res, next) => {
  if (!req.session.appealData) {
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
      },
      checkAnswers: {
        checkAnswers: {
          completed: false
        }
      }
    };
  }

  next();
};
