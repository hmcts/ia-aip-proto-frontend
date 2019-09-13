// eslint-disable-next-line complexity
module.exports = (req, res) => {
  const appealData = req.session.appealData;

  const hasAnsweredAllQuestion = req.session.appealData.hearingRequirements.appellantComing.completed &&
    req.session.appealData.hearingRequirements.giveEvidence.completed &&
    req.session.appealData.hearingRequirements.witnesses.completed &&
    req.session.appealData.hearingRequirements.interpreter.completed &&
    req.session.appealData.hearingRequirements.stepFree.completed &&
    req.session.appealData.hearingRequirements.stepFree.completed &&
    req.session.appealData.hearingRequirements.hearingLoop.completed &&
    req.session.appealData.hearingRequirements.vulnerabilities.completed &&
    req.session.appealData.hearingRequirements.multimediaEvidence.completed &&
    req.session.appealData.hearingRequirements.allMaleFemaleCourt.completed &&
    req.session.appealData.hearingRequirements.inCameraCourt.completed &&
    req.session.appealData.hearingRequirements.anythingElse.completed;


  res.render('hearing-requirements/task-list.html', {
    appealData,
    hideBackLink: true,
    hasAnsweredAllQuestion
  });
};
