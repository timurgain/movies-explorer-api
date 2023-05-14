const router = require('express').Router();
const jsonParser = require('express').json();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const { login, createUser, signout } = require('../controllers/users');
const { isAuthenticated } = require('../middlewares/auth');
const { signupValidation, signinValidation } = require('../middlewares/validation/user');
const { UrlNotFoundError } = require('../errors/castomErrors');

// registration, login, signout
router.post('/signup', jsonParser, signupValidation, createUser);
router.post('/signin', jsonParser, signinValidation, login);
router.post('/signout', isAuthenticated, signout);

// main app routes, required to be authenticated
router.use('/users', isAuthenticated, routerUsers);
router.use('/movies', isAuthenticated, routerMovies);

// 404, url not found
router.use('*', isAuthenticated, (req, res, next) => next(new UrlNotFoundError()));

module.exports = router;
