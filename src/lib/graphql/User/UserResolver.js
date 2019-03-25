import { login, getRabbits, rabbitCUD } from '../../api/UserApi';

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
		async deleteRabbit(_, { input }) {
			return await rabbitCUD(input, 'delete');
		},
		async createRabbit(_, { input }) {
			return await rabbitCUD(input, 'create');
		},
		async editRabbit(_, { input }) {
			return await rabbitCUD(input, 'edit');
		},
	},
};
