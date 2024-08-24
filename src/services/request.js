const axios = require('axios')
const { config } = require('../config/config')

const request = (options) => {
  options.headers = {
    'client_id': config.ACCESS_CLIENT_ID,
    'client_secret': config.ACCESS_CLIENT_SECRET,
    'Content-Type': 'application/json'
  }

  return axios(options);
}

module.exports = request
