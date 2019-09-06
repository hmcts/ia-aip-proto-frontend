module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;

  res.render('case-building/overview.html', {
    hideBackLink: true,
    stages: [
      {
        title: 'Appeal submitted',
        active: true,
        ticked: true
      },
      {
        title: 'Building your case',
        active: true,
        ticked: false
      },
      {
        title: 'Home Office review',
        active: false,
        ticked: false
      },
      {
        title: 'Hearing requirements',
        active: false,
        ticked: false
      },
      {
        title: 'Hearing booked',
        active: false,
        ticked: false
      },
      {
        title: 'Prepare for hearing',
        active: false,
        ticked: false
      },
      {
        title: 'Hearing',
        active: false,
        ticked: false
      },
      {
        title: 'Decision',
        active: false,
        ticked: false
      }
    ],
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
