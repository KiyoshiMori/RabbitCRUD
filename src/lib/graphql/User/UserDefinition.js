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
	
	input deleteRabbitInput {
		id: Int
		name: String
		weight: String
		token: String
	}
	
	type deleteRabbitResponse {
		response: String
	}
	
	extend type Query {
		getRabbitsList(input: getRabbitsInput): [getRabbitsResponse]
	}
	
	extend type Mutation {
		deleteRabbit(input: deleteRabbitInput): deleteRabbitResponse
		login(input: loginInput): loginResponse
	}
`;