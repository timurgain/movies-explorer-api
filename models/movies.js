const mongoose = require('mongoose');
const { isURL } = require('validator')


const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Invalid url format',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Invalid url format',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => isURL(value),
      message: 'Invalid url format',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {}, // TODO: id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});


module.exports = mongoose.model('movie', movieSchema);
