const appConfig = {
  BASE_URL: process.env.BASE_URL || 'localhost',
  NODE_ENV: process.env.NODE_ENV || 'development',
  SERVER_PORT: process.env.PORT || 8080,
}

module.exports.config = appConfig;
