export default `
	input testInput {
		text: String
	}

	type testResponse {
		Answer: String
	}
	
	input testMutationInput {
		newText: String
	}
	
	type testMutationResponse {
		response: String
	}
	
	extend type Query {
		test(input: testInput): testResponse
	}
	
	extend type Mutation {
		testMutation(input: testMutationInput): testMutationResponse
	}
`;