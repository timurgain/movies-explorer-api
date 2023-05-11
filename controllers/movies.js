const { constants } = require('http2');
const MovieModel = require('../models/movie');
const { NullQueryResultError } = require('../errors/castomErrors');
const { ForbiddenError } = require('../errors/castomErrors');

function getMovies(req, res, next) {
  MovieModel.find({ owner: req.user._id })
    .then((queryObj) => res.send(queryObj))
    .catch(next);
}

function postMovie(req, res, next) {
  const owner = req.user._id;
  MovieModel.create({ ...req.body, owner })
    .then((queryObj) => res.status(constants.HTTP_STATUS_CREATED).send(queryObj))
    .catch(next);
}

function deleteMovie(req, res, next) {
  MovieModel.findOne({ _id: req.params._id })
    .populate('owner')
    .then((movie) => {
      if (!movie) throw new NullQueryResultError();
      if (movie.owner._id.toString() !== req.user._id) throw new ForbiddenError();
      return movie.deleteOne();
    })
    .then(() => res.status(constants.HTTP_STATUS_NO_CONTENT).end())
    .catch(next);
}

module.exports = { getMovies, postMovie, deleteMovie };
