const router = require('express').Router();
const jsonParser = require('express').json();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { movieValidation, movieIdUrlParamsValidation } = require('../middlewares/validation/movie');

router.get('/', getMovies);
router.post('/', jsonParser, movieValidation, postMovie);
router.delete('/:_id', movieIdUrlParamsValidation, deleteMovie);
// _id of movie in this api service, not in MoviesExplorer api service

module.exports = router;
