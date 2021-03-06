const moment = require('moment');
const { CLARIFYING_QUESTIONS_SENT } = require('../data/constants');
const { directionsPrepopulated } = require('../data/prepopulatedData');

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
        },
        allMaleFemaleCourt: {
          completed: false
        },
        inCameraCourt: {
          completed: false
        },
        pastExperiences: {
          completed: false
        },
        anythingElse: {
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
          description: 'You said you had three children in your appeal. ' +
            'Please can you give us some more information about them:\n\n' +
            '* What are their names?\n' +
            '* What are their ages?\n' +
            '* How long have they lived in the UK?',
          completed: false
        },
        {
          description: `You said you have chronic back pain.\n\n
            * How long have you suffered from this problem?
            * How does it affect your daily life?
            * What medicine, if any, do you take to treat the problem?`,
          completed: false
        }
      ],
      anythingElseToAdd: {
        completed: false
      },
      directions: {
        appellant: directionsPrepopulated.appellant,
        date: {
          year: '2019',
          month: '11',
          day: '01',
          hours: '10',
          minutes: '30',
          seconds: '00'
        }
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
        evidence: [{ fileName: 'extra evidence.txt', description: 'describe my evidence' }]
      }
    });
  }

  if (req.query.hearingRequirements) {
    Object.assign(req.session.appealData, {
      hearingRequirements: {
        appellantComing: { completed: true, isComing: 'yes' },
        giveEvidence: { completed: true, giveEvidence: 'yes' },
        witnesses: { completed: true, witnesses: 'yes', names: ['witness 1', 'witness 2'] },
        interpreter: {
          completed: true,
          required: 'yes',
          languages: [{ name: 'French', dialect: 'Dialect 1' }, { name: 'Urdu', dialect: 'Dakhini' }]
        },
        stepFree: { completed: true, stepFree: 'yes' },
        hearingLoop: { completed: true, hearingLoop: 'yes' },
        vulnerabilities: {
          completed: true,
          vulnerabilities: 'yes',
          hearingImpairment: true,
          physicalDisability: true,
          illHealth: true,
          cognitiveImpairment: true,
          learningDisability: true,
          mentalHealthDisorder: true,
          domesticViolence: true,
          other: true,
          description: 'Description for vulnerability'
        },
        multimediaEvidence: {
          completed: true,
          multimediaEvidence: 'yes',
          equipment: 'no',
          description: 'Description for multimedia'
        },
        allMaleFemaleCourt: {
          completed: true,
          allMaleFemaleCourt: 'yes',
          maleOrFemale: 'male',
          description: 'Description for male female court'
        },
        inCameraCourt: {
          completed: true,
          inCameraCourt: 'yes',
          description: 'Description for in camera court'
        },
        pastExperiences: {
          completed: true,
          pastExperiences: 'yes',
          description: 'Description for past experiences'
        },
        anythingElse: {
          completed: true,
          anythingElse: 'yes',
          description: 'Description for anything else'
        }
      }
    });
  }

  if (req.query.hearingRequirementsNo) {
    Object.assign(req.session.appealData, {
      hearingRequirements: {
        appellantComing: { completed: true, isComing: 'no' },
        giveEvidence: { completed: true, giveEvidence: 'no' },
        witnesses: { completed: true, witnesses: 'no' },
        interpreter: { completed: true, required: 'no' },
        stepFree: { completed: true, stepFree: 'no' },
        hearingLoop: { completed: true, hearingLoop: 'no' },
        vulnerabilities: { completed: true, vulnerabilities: 'no' },
        multimediaEvidence: { completed: true, multimediaEvidence: 'no' },
        allMaleFemaleCourt: { completed: true, allMaleFemaleCourt: 'no' },
        inCameraCourt: { completed: true, inCameraCourt: 'no' },
        anythingElse: { completed: true, anythingElse: 'no' }
      }
    });
  }
  if (req.query.clarifyingQuestionsSent) {
    Object.assign(req.session.appealData, {
      tcw: {
        state: CLARIFYING_QUESTIONS_SENT
      }
    });
  }
  next();
};
