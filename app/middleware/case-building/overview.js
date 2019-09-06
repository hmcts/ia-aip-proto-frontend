const moment = require('moment');

module.exports = (req, res) => {
  const reasonsForAppealCompleted = req.session.appealData.appealDetails.reasonsForAppeal.completed;

  // eslint-disable-next-line no-magic-numbers
  const respondByDate = moment.utc().add(1, 'weeks').format('D MMMM YYYY');

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
    respondByDate,
    reasonsForAppealCompleted,
    appealData: req.session.appealData
  });
};
