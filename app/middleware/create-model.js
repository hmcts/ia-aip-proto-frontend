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
          completed: true,
          // eslint-disable-next-line max-len
          why: 'This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so te lar.This is a reason for the appeal.Foo bar so.'
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
