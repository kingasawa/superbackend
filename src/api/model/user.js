const DatabaseService = require('../../database/databaseService');
const UserEntity = require('../../database/entities/User');

const UserService = {
	checkAuth: async (
		email, password
	) => {
		console.log('payload', {email, password});
		console.log('UserEntity', UserEntity);
		const userRepository = DatabaseService.getRepository(UserEntity);
		const user = await userRepository.findOneBy({
			email, password
		});
		if (!user) {
			return {
				error: true,
				message: 'User not found',
				user: {}
			}
		}
		console.log('user', user);
		return {
			error: false,
			message: '',
			user
		}
	},
};

module.exports = UserService;
