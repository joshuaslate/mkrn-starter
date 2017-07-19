const validator = require('validator');
const ERRORS = require('../constants').ERRORS;

/**
 * responseValidator - Validate responses and return corresponding errors
 *
 * @param  {Object} req     the Koa request body
 * @param  {Array}  fields  an array of fields on the req to validate
 * @return {Object}         validated/sanitized request body
 */
const responseValidator = function responseValidator(req, fields) {
  const errors = [];
  const props = Object.keys(req);

  for (let i = 0; i < fields.length; i += 1) {
    const isPresent = props.indexOf(fields[i].name) !== -1;
    const isRequired = fields[i].required;

    if (!isPresent && isRequired) {
      switch (fields[i].name) {
        case 'email': errors.push({ error: ERRORS.INVALID_EMAIL }); break;
        case 'name':
          if (!req.name || !req.name.first || !req.name.last) {
            errors.push({ error: ERRORS.INVALID_NAME });
          }
          break;
        case 'password': errors.push({ error: ERRORS.INVALID_PASSWORD }); break;
        case 'passwordConfirm': errors.push({ error: ERRORS.PASSWORD_MUST_MATCH }); break;
        default: errors.push({ error: ERRORS.INVALID_ENTRY }); break;
      }
    } else {
      // Escape and sanitize inputs for security (validator only works on strings)
      if (typeof req[fields[i].name] === 'string') {
        req[fields[i].name] = validator.trim(req[fields[i].name]);
        // Evidently, React already escapes strings
        // req[fields[i].name] = validator.escape(req[fields[i].name]);
      }

      if (fields[i].name === 'email') {
        if (!validator.isEmail(req.email)) {
          errors.push({ error: ERRORS.INVALID_EMAIL });
        }
      }
      if (fields[i].name === 'password') {
        if (req.password && req.password.length < 8) {
          errors.push({ error: ERRORS.PASSWORD_TOO_SHORT });
        }
      }
      if (fields[i].name === 'passwordConfirm') {
        if (req.passwordConfirm !== req.password) {
          errors.push({ error: ERRORS.PASSWORD_MUST_MATCH });
        }
      }
    }
  }

  // If there are errors, return them, otherwise return the modified request body.
  if (errors && errors.length) {
    return errors;
  }
  return req;
};

/**
 * filterSensitiveData  - Filters out sensitive data from a request body
 *
 * @param  {Object} req     the Koa request body
 * @return {Object}         Body without sensitive fields
 */
const filterSensitiveData = (req) => {
  const newBody = {};
  const sensitiveKeys = [
    'password',
    'billing',
  ];

  Object.keys(req).forEach((item) => {
    if (sensitiveKeys.indexOf(item) === -1) {
      newBody[item] = req[item];
    }
  });

  return newBody;
};

module.exports = {
  responseValidator,
  filterSensitiveData,
};
