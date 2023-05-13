const { constants } = require('http2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const {
  NullQueryResultError,
  CredentialsError,
} = require('../errors/castomErrors');
const config = require('../config');

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => UserModel.create({
      password: hash, email, name,
    }))
    .then((queryObj) => {
      const user = queryObj.toObject();
      delete user.password;
      res.status(constants.HTTP_STATUS_CREATED).send(user);
    })
    .catch(next);
}

function getUserMe(req, res, next) {
  UserModel.findOne({ _id: req.user._id })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch(next);
}

function patchUserMe(req, res, next) {
  UserModel.findByIdAndUpdate({ _id: req.user._id }, { name: req.body.name }, {
    returnDocument: 'after',
    runValidators: true,
  })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res.send(queryObj);
    })
    .catch(next);
}

function login(req, res, next) {
  UserModel.findOne({ email: req.body.email }).select('+password').then((user) => {
    if (!user) throw new CredentialsError();
    return bcrypt
      .compare(req.body.password, user.password)
      .then((isMatch) => {
        if (!isMatch) throw new CredentialsError();
        const token = jwt.sign({ _id: user._id }, config.jwt.secretKey, {
          expiresIn: '7d',
        });
        res
          .status(constants.HTTP_STATUS_OK)
          .cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true })
          .end();
      });
  })
    .catch(next);
}

function signout(req, res, next) {
  UserModel.findOne({ _id: req.user._id })
    .then((queryObj) => {
      if (!queryObj) throw new NullQueryResultError();
      res
        .clearCookie('jwt', { httpOnly: true })
        .status(constants.HTTP_STATUS_OK)
        .end();
    })
    .catch(next);
}

module.exports = {
  createUser,
  getUserMe,
  patchUserMe,
  login,
  signout,
};
