export default {
	Query: {
		async test(_, { input }) {
			console.log({ input });

			return new Promise(resolve => {
				setTimeout(() => {
					resolve({
						Answer: `Hi ${input.text}`,
					});
				}, 1500);
			});
		}
	},
	Mutation: {
		async testMutation(_, { input }) {
			return {
				response: `Mutated. New text: ${input.newText}`
			};
		}
	}
}