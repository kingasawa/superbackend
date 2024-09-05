const axios = require('axios');

module.exports = async (method, url, data) => {
  const options = {
    url,
    method,
    responseType: 'json',
  };

  options.header = { 'content-type': 'application/x-www-form-urlencoded' };
  options.responseType = 'JSON';

  method.toUpperCase() === 'POST' ? options.data = data : options.params = data;

  const resultRequest = await axios(options);

  return resultRequest.data;
};
