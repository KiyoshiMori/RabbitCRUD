export default `
	input loginInput {
		login: String
		password: String
	}
	
	type loginResponse {
		token: String
	}
	
	extend type Mutation {
		login(input: loginInput): loginResponse
	}
`;