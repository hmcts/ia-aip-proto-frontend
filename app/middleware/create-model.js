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
      respondByDate: moment.utc().add(4, 'weeks').format('D MMMM YYYY'),
      hearingRequirements: {
        appellantComing: {
          completed: false
        },
        giveEvidence: {
          completed: false
        },
        witnesses: {
          completed: false
        },
        interpreter: {
          completed: false
        },
        stepFree: {
          completed: false
        },
        hearingLoop: {
          completed: false
        },
        vulnerabilities: {
          completed: false
        },
        multimediaEvidence: {
          completed: false
        }
      }
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
          givenNames: 'Pablo',
          familyName: 'Jimenez',
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
          completed: false
        },
        {
          title: 'Tell us more about your health issues',
          description: `You said you have chronic back pain.\n\n
            * How long have you suffered from this problem?
            * How does it affect your daily life?
            * What medicine, if any, do you take to treat the problem?`,
          completed: false
        }
      ],
      anythingElseToAdd: {
        completed: false
      }
    });
  }

  if (req.query.answerQuestions) {
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
          evidence: [{ fileName: 'evidence.txt', description: 'description of the evidence' }]
        },
        {
          title: 'Tell us more about your health issues',
          description: `You said you have chronic back pain.\n\n
            * How long have you suffered from this problem?
            * How does it affect your daily life?
            * What medicine, if any, do you take to treat the problem?`,
          completed: true,
          answer: `I have had chronic back pain since I was beaten up by a militia group
            in 2016. The pain makes it difficult to work and affects my mobility. My
            GP has prescribed pain killers to help manage the pain.`,
          evidence: [
            { fileName: 'page5.png', description: 'Page 5 of country report' },
            { fileName: 'page6.png', description: 'Page 6 of country report' },
            { fileName: 'page7.png', description: 'Page 7 of country report' }
          ]
        }
      ]
    });
  }

  if (req.query.additionalInformation) {
    Object.assign(req.session.appealData, {
      anythingElseToAdd: {
        completed: true,
        answer: 'Need content',
        evidence: [ { fileName: 'extra evidence.txt', description: 'describe my evidence' }]
      }
    });
  }


  next();
};
