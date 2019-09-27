const paths = require('../../paths');
module.exports = (req, res) => {
  const appealData = req.session.appealData;
  const checkListWitnessRows = [];
  const checkListhearingNeedsRows = [];
  const checkListOtherNeedsRows = [];
  checkListWitnessRows.push({
    key: {
      text: 'Will you bring any witnesses to the hearing?'
    },
    value: {
      html: appealData.hearingRequirements.witnesses.witnesses
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/witnesses',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.witnesses.witnesses === 'yes') {
    checkListWitnessRows.push({
      key: {
        text: 'How many witnesses will you bring?'
      },
      value: {
        html: appealData.hearingRequirements.witnesses.number
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/witnesses',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListhearingNeedsRows.push(
    {
      key: {
        text: 'Will you or any witnesses need an interpreter at the hearing?'
      },
      value: {
        html: appealData.hearingRequirements.interpreter.required
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/interpreter',
            text: 'Change'
          }
        ]
      }
    });
  if (appealData.hearingRequirements.interpreter.required === 'yes') {
    const details = '<table>' + appealData.hearingRequirements.interpreter.languages.map(language => {
      let langaugeString = `<tr><td>${language.name}</td>`;
      if (language.dialect) {
        langaugeString += `<td>${language.dialect}</td>`;
      }
      langaugeString += '</tr>';
      return langaugeString;
    }).join('') + '</table>';
    checkListhearingNeedsRows.push(
      {
        key: {
          text: 'Interpreter details'
        },
        value: {
          html: details
        },
        actions: {
          items: [
            {
              href: '/hearing-requirements/interpreter',
              text: 'Change'
            }
          ]
        }
      });
  }
  checkListhearingNeedsRows.push({
    key: {
      text: 'Will you need step-free access?'
    },
    value: {
      html: appealData.hearingRequirements.stepFree.stepFree
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/step-free',
          text: 'Change'
        }
      ]
    }
  });
  checkListhearingNeedsRows.push({
    key: {
      text: 'Will you need a hearing loop?'
    },
    value: {
      html: appealData.hearingRequirements.hearingLoop.hearingLoop
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/hearing-loop',
          text: 'Change'
        }
      ]
    }
  });




  checkListOtherNeedsRows.push({
    key: {
      text: 'Will you bring any multimedia evidence, like video recordings, to the hearing?'
    },
    value: {
      html: appealData.hearingRequirements.multimediaEvidence.multimediaEvidence
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/multimedia-evidence',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.multimediaEvidence.multimediaEvidence === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'Tell us what format the evidence in in (for example, .mov, .mp3) and what equipment you will need to play it'
      },
      value: {
        html: appealData.hearingRequirements.multimediaEvidence.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/multimedia-evidence',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListOtherNeedsRows.push({
    key: {
      text: 'Do you need an all-female or all-male Hearing?'
    },
    value: {
      html: appealData.hearingRequirements.allMaleFemaleCourt.allMaleFemaleCourt
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/all-male-female-court',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.allMaleFemaleCourt.allMaleFemaleCourt === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'What type of hearing will you need?'
      },
      value: {
        html: appealData.hearingRequirements.allMaleFemaleCourt.maleOrFemale
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/all-male-female-court',
            text: 'Change'
          }
        ]
      }
    });
    checkListOtherNeedsRows.push({
      key: {
        text: `Tell us why you need an all-${appealData.hearingRequirements.allMaleFemaleCourt.maleOrFemale}  hearing?`
      },
      value: {
        html: appealData.hearingRequirements.allMaleFemaleCourt.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/all-male-female-court',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListOtherNeedsRows.push({
    key: {
      text: 'Will you need a private hearing?'
    },
    value: {
      html: appealData.hearingRequirements.inCameraCourt.inCameraCourt
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/in-camera-court',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.inCameraCourt.inCameraCourt === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'Tell us why you need a private hearing'
      },
      value: {
        html: appealData.hearingRequirements.inCameraCourt.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/in-camera-court',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListOtherNeedsRows.push({
    key: {
      text: 'Do you have any physical or mental health issues that will affect you at the hearing?'
    },
    value: {
      html: appealData.hearingRequirements.vulnerabilities.vulnerabilities
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/vulnerabilities',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.vulnerabilities.vulnerabilities === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'Tell us how any physical or mental health issues you have will affect you at the hearing'
      },
      value: {
        html: appealData.hearingRequirements.vulnerabilities.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/vulnerabilities',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListOtherNeedsRows.push({
    key: {
      text: 'Have you had any past experiences that will affect you at the hearing?'
    },
    value: {
      html: appealData.hearingRequirements.pastExperiences.pastExperiences
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/past-experiences',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.pastExperiences.pastExperiences === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'Tell us how any past experiences will affect you at the hearing'
      },
      value: {
        html: appealData.hearingRequirements.pastExperiences.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/past-experiences-description',
            text: 'Change'
          }
        ]
      }
    });
  }
  checkListOtherNeedsRows.push({
    key: {
      text: 'Will you need anything else at the hearing?'
    },
    value: {
      html: appealData.hearingRequirements.anythingElse.anythingElse
    },
    actions: {
      items: [
        {
          href: '/hearing-requirements/anything-else',
          text: 'Change'
        }
      ]
    }
  });
  if (appealData.hearingRequirements.anythingElse.anythingElse === 'yes') {
    checkListOtherNeedsRows.push({
      key: {
        text: 'Tell us what you will need and why you need it'
      },
      value: {
        html: appealData.hearingRequirements.anythingElse.description
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/anything-else',
            text: 'Change'
          }
        ]
      }
    });
  }
  res.render('hearing-requirements/check-answers.html', {
    appealData,
    hideBackLink: false,
    previousPage: paths.hearingAppellantTaskList,
    checkListWitnessRows,
    checkListhearingNeedsRows,
    checkListOtherNeedsRows
  });
};
