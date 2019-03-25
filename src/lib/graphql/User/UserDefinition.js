export default `
	input loginInput {
		login: String
		password: String
	}
	
	type loginResponse {
		token: String
	}
	
	input getRabbitsInput {
		token: String
	}
	
	type getRabbitsResponse {
		id: Int
		name: String
		weight: String
	}
	
	extend type Query {
		getRabbitsList(input: getRabbitsInput): [getRabbitsResponse]
	}
	
	extend type Mutation {
		login(input: loginInput): loginResponse
	}
`;