const moment = require('moment');

module.exports = (req, res, next) => {
  if (!req.session.appealData) {
    req.session.appealData = {
      accountCreated: {
        completed: false
      },
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
      // eslint-disable-next-line no-magic-numbers
      respondByDate: moment.utc().add(1, 'weeks').format('D MMMM YYYY')
    };
  }

  if (req.query.createData) {
    Object.assign(req.session.appealData, {
      accountCreated: {
        completed: true
      },
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
            phoneNumber: '07899999999'
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
    });
  }

  if (req.query.reasonsForAppeal) {
    Object.assign(req.session.appealData, {
      appealDetails: {
        reasonsForAppeal: {
          completed: true,
          // eslint-disable-next-line max-len
          why: 'This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so.',
          evidence: []
        }
      }
    });
  }

  if (req.query.questions) {
    Object.assign(req.session.appealData, {
      questions: [
        {
          title: 'Tell us more about your children',
          description: 'You said you had three children in your appeal. ' +
            'Please can you give us some more information about them:\n\n' +
            '* What are their names?\n' +
            '* What are their ages?\n' +
            '* How long have they lived in the UK?',
          completed: true,
          // eslint-disable-next-line max-len
          answer: 'My children\'s names are Ali, Umid and Ghulam. Ali is 8, Umiod is 6 and Ghulam is 2. They have lived in the UK since they were born.',
          evidence: ['evidence.txt']
        },
        {
          title: 'Some pages from the country report you submitted as evidence are missing',
          description: 'Pages 5 to 7 from the country report are missing.\n\nPlease provide the missing pages below.',
          completed: true,
          answer: 'I have attached the missing pages',
          evidence: ['page5.png', 'page6.png', 'page7.png']
        }
      ]
    });
  }

  next();
};
