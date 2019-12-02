const paths = require('../../paths');
module.exports = (req, res) => {
  const appealData = req.session.appealData;
  console.log('hearingRequirements', appealData.hearingRequirements);
  const checkListWitnessRows = [];
  const checkListhearingNeedsRows = [];
  const checkStepFreeNeedsRows = [];
  const checkHearingLoopNeedsRows = [];

  const checkListOtherNeedsRows = [];
  checkListWitnessRows.push({
    key: {
      text: 'Question'
    },
    value: {
      text: 'Will any witnesses come to the hearing?'
    }
  });
  checkListWitnessRows.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.witnesses.witnesses,
      classes: '--capitalize'
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
        text: 'Witnesses'
      },
      value: {
        html: appealData.hearingRequirements.witnesses.names.join('<br/>')
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
  checkListhearingNeedsRows.push({
    key: {
      text: 'Question'
    },
    value: {
      text: 'Will you or any witnesses need an interpreter at the hearing?'
    }
  });
  checkListhearingNeedsRows.push(
    {
      key: {
        text: 'Answer'
      },
      value: {
        html: appealData.hearingRequirements.interpreter.required,
        classes: '--capitalize'
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
    appealData.hearingRequirements.interpreter.languages.forEach(language => {
      const languageRow = {
        key: { 
          text: 'Language',
          classes: language.dialect ? 'no-border-bottom' : ''
        },
        value: {
          text: language.name,
          classes: language.dialect ? 'no-border-bottom' : ''
        },
        actions: {
          items: [
            {
              href: '/hearing-requirements/interpreter',
              text: 'Change',
              classes: language.dialect ? 'no-border-bottom' : ''
            }
          ],
          classes: language.dialect ? 'no-border-bottom' : ''
        }
      }
      const dialectRow = language.dialect ? {
        key: { 
          text: 'Dialect'
        },
        value: {
          text: language.dialect
        },
        actions: {
          items: [
            {
              href: '',
              text: ''
            }
          ]
        }
      } : {}
      checkListhearingNeedsRows.push(languageRow);
      checkListhearingNeedsRows.push(dialectRow);
    })
  }

  checkStepFreeNeedsRows.push({
    key: {
      text: 'Question'
    },
    value: {
      html: 'Will you or any witnesses need step-free access?'
    }
  });
  
  checkStepFreeNeedsRows.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.stepFree.stepFree,
      classes: '--capitalize'
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

  // Hearing Loop
  const hearingLoopNeeds = [];

  hearingLoopNeeds.push({
    key: {
      text: 'Question'
    },
    value: {
      html: 'Will you or any witnesses need a hearing loop?'
    }
  });
  
  hearingLoopNeeds.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.hearingLoop.hearingLoop,
      classes: '--capitalize'
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

  // Multimedia Evidence
  const multimediaEvidence = []

  multimediaEvidence.push({
    key: {
      text: 'Question'
    },
    value: {
      html: 'Will you bring any multimedia evidence?'
    }
  });

  multimediaEvidence.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.multimediaEvidence.multimediaEvidence,
      classes: '--capitalize'
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
    multimediaEvidence.push({
      key: {
        text: 'Question'
      },
      value: {
        html: 'Will you bring the equipment to play this evidence?'
      }
    });

    multimediaEvidence.push({
      key: {
        text: 'Answer'
      },
      value: {
        html: appealData.hearingRequirements.multimediaEvidence.equipment,
        classes: '--capitalize'
      },
      actions: {
        items: [
          {
            href: '/hearing-requirements/multimedia-equipment',
            text: 'Change'
          }
        ]
      }
    });

    if (appealData.hearingRequirements.multimediaEvidence.equipment === 'no') {
      multimediaEvidence.push({
        key: {
          text: 'Question'
        },
        value: {
          html: 'Tell us why it is not possible to bring the equipment to play this evidence and what you will need to play it.'
        }
      });

      multimediaEvidence.push({
        key: {
          text: 'Answer'
        },
        value: {
          html: appealData.hearingRequirements.multimediaEvidence.description
        },
        actions: {
          items: [
            {
              href: '/hearing-requirements/multimedia-equipment-description',
              text: 'Change'
            }
          ]
        }
      });
    }

  }

  const oneGenreHearing = []

  oneGenreHearing.push({
    key: {
      text: 'Question'
    },
    value: {
      html: 'Will you need an all-female or all-male hearing?'
    }
  });

  oneGenreHearing.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.allMaleFemaleCourt.allMaleFemaleCourt,
      classes: '--capitalize'
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
    oneGenreHearing.push({
      key: {
        text: 'Question'
      },
      value: {
        html: 'What type of hearing will you need?'
      }
    });

    oneGenreHearing.push({
      key: {
        text: 'Answer'
      },
      value: {
        html: `All-${appealData.hearingRequirements.allMaleFemaleCourt.maleOrFemale}`
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

    oneGenreHearing.push({
      key: {
        text: 'Question'
      },
      value: {
        html: `Tell us why you need an all-${appealData.hearingRequirements.allMaleFemaleCourt.maleOrFemale}  hearing?`
      }
    });

    oneGenreHearing.push({
      key: {
        text: `Answer`
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

  const privateHearing = [];

  privateHearing.push({
    key: {
      text: 'Question'
    },
    value: {
      html: `Will you need a private hearing?`
    }
  });

  privateHearing.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.inCameraCourt.inCameraCourt,
      classes: '--capitalize'
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
    privateHearing.push({
      key: {
        text: 'Question'
      },
      value: {
        html: `Tell us why you need a private hearing`
      }
    });
    privateHearing.push({
      key: {
        text: 'Answer'
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

  const healthIssues = [];

  healthIssues.push({
    key: {
      text: 'Question'
    },
    value: {
      html: `Do you have any physical or mental health issues that may affect you at the hearing?`
    }
  });

  healthIssues.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.vulnerabilities.vulnerabilities,
      classes: '--capitalize'
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
    healthIssues.push({
      key: {
        text: 'Question'
      },
      value: {
        html: `Tell us how any physical or mental health issues you have will affect you at the hearing`
      }
    });

    healthIssues.push({
      key: {
        text: 'Answer'
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

  const pastExperiences = [];

  pastExperiences.push({
    key: {
      text: 'Question'
    },
    value: {
      html: `Have you had any past experiences that will affect you at the hearing?`
    }
  });

  pastExperiences.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.pastExperiences.pastExperiences,
      classes: '--capitalize'
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
    pastExperiences.push({
      key: {
        text: 'Question'
      },
      value: {
        html: `Tell us how any past experiences may affect you at the hearing`
      }
    });

    pastExperiences.push({
      key: {
        text: 'Answer'
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

  const anythingElse = []
  anythingElse.push({
    key: {
      text: 'Question'
    },
    value: {
      html: `Will you need anything else at the hearing?`
    }
  });
  anythingElse.push({
    key: {
      text: 'Answer'
    },
    value: {
      html: appealData.hearingRequirements.anythingElse.anythingElse,
      classes: '--capitalize'
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
    anythingElse.push({
      key: {
        text: 'Question'
      },
      value: {
        html: `Tell us what you will need and why you need it`
      }
    });

    anythingElse.push({
      key: {
        text: 'Answer'
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
    checkStepFreeNeedsRows,
    hearingLoopNeeds,
    multimediaEvidence,
    oneGenreHearing,
    privateHearing,
    healthIssues,
    pastExperiences,
    anythingElse
  });
};
