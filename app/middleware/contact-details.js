const { formController } = require('./form-controller');

function validation() {
  return [];
}

function extractBody(req) {
  const contact = req.body.contact ? req.body.contact : [];
  return {
    email: {
      selected: contact.indexOf('email') > -1,
      emailAddress: req.body['contact-by-email']
    },
    text: {
      selected: contact.indexOf('text') > -1,
      phoneNumber: req.body['contact-by-text']
    },
    post: {
      selected: contact.indexOf('post') > -1
    }
  };
}

function createFormController() {
  return formController(
    'your-contact-details.html', 'yourDetails', 'contactDetails', validation, extractBody
  );
}

module.exports = {
  createFormController
};