const moment = require('moment');

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
      },
      questions: [
        {
          title: 'Tell us more about your children',
          description: 'You said you had three children in your appeal. ' +
            'Please can you give us some more information about them:\n\n' +
            '* What are their names?\n' +
            '* What are their ages?\n' +
            '* How long have they lived in the UK?',
          completed: false
        },
        {
          title: 'Some pages from the country report you submitted as evidence are missing',
          description: 'Pages 5 to 7 from the country report are missing.\n\nPlease provide the missing pages below.',
          completed: false
        }
      ],
      // eslint-disable-next-line no-magic-numbers
      respondByDate: moment.utc().add(1, 'weeks').format('D MMMM YYYY')
    };
  }

  if (req.query.createData) {
    req.session.appealData = {
      yourDetails: {
        homeOffice: {
          completed: true,
          refNumber: 'A1234567',
          letterDate: {
            day: '01',
            month: '01',
            year: '2000'
          }
        },
        personalDetails: {
          completed: true,
          title: 'Mr',
          givenNames: 'Chris',
          familyName: 'Grimble',
          dateOfBirth: {
            day: '01',
            month: '01',
            year: '2019'
          }
        },
        contactDetails: {
          completed: true,
          email: {
            selected: true,
            emailAddress: 'qwerty@foo.com'
          },
          text: {
            selected: true,
            phoneNumber: '07899948907'
          },
          post: {
            selected: true
          }
        }
      },
      appealDetails: {
        typeOfAppeal: {
          completed: true,
          protection: true,
          humanRights: true,
          eea: false,
          revocationOfProtection: false,
          deprivationOfCitizenship: false
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
