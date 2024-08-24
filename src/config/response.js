
module.exports = {
  OK: {
    statusCode: 200,
    message: 'Request has succeeded.'
  },
  BAD_REQUEST: {
    statusCode: 400,
    message: 'The request could not be understood by the server.'
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'The client does not have access rights to the content.'
  },
  REQUEST_TIMEOUT: {
    statusCode: 408,
    message: 'Request timeout',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Occurs Error',
  },
}
