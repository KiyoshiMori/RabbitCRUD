import { login, getRabbits } from '../../api/UserApi';

export default {
	Query: {
		async getRabbitsList(_, { input }) {
			return await getRabbits(input);
		},
	},
	Mutation: {
		async login(_, { input }) {
			const response = await login(input);

			console.log({ response });

			return response;
		},
	},
};
