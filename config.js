require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const prodOrigins = [
  'http://movie-tm.nomoredomains.monster',
  'https://movie-tm.nomoredomains.monster',
];

const devOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://movie-tm.nomoredomains.monster',
  'https://movie-tm.nomoredomains.monster',
];

const config = {
  app: {
    port: 3000,
  },
  db: {
    uri: 'mongodb://localhost:27017/bitfilmsdb',
  },
  jwt: {
    secretKey: NODE_ENV === 'production'
      ? JWT_SECRET
      : 'dev-secret-key',
  },
  cors: {
    allowOrigins: NODE_ENV === 'production'
      ? prodOrigins
      : devOrigins,
    allowMethods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  },
  regExp: {
    password: /^[A-Za-z0-9]{4,}$/,
    url: /^(ftp|http|https):\/\/[^ "]+#*$/,
    mongoObjectId: /^[0-9a-fA-F]{24}$/,
  },
};

module.exports = config;
