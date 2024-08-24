const { INTERNAL_SERVER_ERROR, REQUEST_TIMEOUT } = require('../config/response');

const handleResponseError = (error) => {
  if (error.response) {
    return {
      status: error.response.status,
      data: error.response.data,
    }
  }
  
  const errorInfo = (error.message || '').includes('timeout') ? REQUEST_TIMEOUT : INTERNAL_SERVER_ERROR;
  return {
    status: errorInfo.statusCode,
    data: {
      message: error.message || errorInfo.message,
    }
  }
}

module.exports = {
  handleResponseError
};
