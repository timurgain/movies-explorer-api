const { Joi, celebrate } = require('celebrate');
const config = require('../../config');

// Schemas
const movieSchema = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().uri().pattern(config.regExp.url),
  trailerLink: Joi.string().required().uri().pattern(config.regExp.url),
  thumbnail: Joi.string().required().uri().pattern(config.regExp.url),
  // id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
  movieId: Joi.string().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
});

const cardIdUrlParamsSchema = Joi.object().keys({
  _id: Joi.string().required().pattern(config.regExp.mongoObjectId),
});

// Validators
function movieValidation(req, res, next) {
  celebrate(
    {
      body: movieSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

function movieIdUrlParamsValidation(req, res, next) {
  celebrate(
    {
      params: cardIdUrlParamsSchema,
    },
    { abortEarly: false },
  )(req, res, next);
}

module.exports = { movieValidation, movieIdUrlParamsValidation };
