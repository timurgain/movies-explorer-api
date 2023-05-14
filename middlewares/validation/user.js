const { celebrate, Joi } = require('celebrate');
const config = require('../../config');

// Schemas
const signinSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().pattern(config.regExp.password),
});

const signupSchema = Joi.object().keys({
  email: Joi.string().required().email({ minDomainSegments: 2 }),
  password: Joi.string().required().pattern(config.regExp.password),
  name: Joi.string().required().min(2).max(30),
});

const userInfoSchema = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email({ minDomainSegments: 2 }),
});

// factory func for body validation
function createValidationMiddleware(schema) {
  return (req, res, next) => {
    celebrate(
      {
        body: schema,
      },
      { abortEarly: false },
    )(req, res, next);
  };
}

// Validation maddlewares
module.exports = {
  signinValidation: createValidationMiddleware(signinSchema),
  signupValidation: createValidationMiddleware(signupSchema),
  userInfoValidation: createValidationMiddleware(userInfoSchema),
};
