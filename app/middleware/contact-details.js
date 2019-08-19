const { formController } = require('./form-controller');
const { check } = require('express-validator');

function validation(locale) {
  function validateEmail(email) {
    // eslint-disable-next-line max-len
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return [
    check('contact').not().isEmpty().withMessage(locale.contactDetails.errors.selectAnOption),
    check('contact-by-email').custom((value, { req }) => {
      if (req.body.contact && req.body.contact.indexOf('email') > -1) {
        return validateEmail(value);
      }
      return true;
    }).withMessage(locale.contactDetails.errors.email),
    check('contact-by-text').custom((value, { req }) => {
      if (req.body.contact && req.body.contact.indexOf('text') > -1) {
        return /^[0-9]+$/.test(value);
      }
      return true;
    }).withMessage(locale.contactDetails.errors.text)
  ];
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