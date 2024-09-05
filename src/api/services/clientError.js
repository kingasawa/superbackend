class ClientError extends Error {
	constructor(message, code) {
		super(message);
		this.code = code;

		if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ClientError);
		}
		this.name = 'ClientError';
	}
}

module.exports.ClientError = ClientError;
