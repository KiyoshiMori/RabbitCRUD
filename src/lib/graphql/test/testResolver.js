export default {
	Query: {
		async test(_, { input }) {
			console.log({ input });
			return {
				Answer: `Hi ${input.text}`,
			};
		}
	}
}