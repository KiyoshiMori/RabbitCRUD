import { login } from '../../api/UserApi';

export default {
	Query: {
	},
	Mutation: {
		async login(_, { input }) {
			const response = await login(input);

			console.log({ response });

			return response;
		},
	},
};
