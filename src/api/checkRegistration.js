const { handleResponseError } = require('../services/handleResponse');

module.exports = async (payload) => {
  const { body } = payload

  try {
    return {
      test: 'aaaaa'
    }
  } catch (error) {
    const errorResponse = handleResponseError(error);
    return errorResponse;
  }
}
