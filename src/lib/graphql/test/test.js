export default `
	input testInput {
		text: String
	}

	type testResponse {
		Answer: String
	}
	
	extend type Query {
		test(input: testInput): testResponse
	}
`;