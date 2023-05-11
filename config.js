const config = {
  app: {
    port: 3000,
  },
  db: {
    uri: 'mongodb://localhost:27017/bitfilmsdb',
  },
  jwt: {
    secretKey: 'dev-secret-key',
  },
  regExp: {
    password: /^[A-Za-z0-9]{4,}$/,
    url: /^(ftp|http|https):\/\/[^ "]+#*$/,
    mongoObjectId: /^[0-9a-fA-F]{24}$/,
  },
};

module.exports = config;
