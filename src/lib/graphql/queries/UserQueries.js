import gql from 'graphql-tag';

export const getRabbitsQuery = gql`
query getRabbits ($token: String) {
  getRabbitsList(input: { token: $token}) {
    id
    name
    weight
  }
}
`;

export const createRabbitsQuery = gql`
mutation createRabbit($token: String, $name: String, $weight: String) {
	createRabbit(input: { token: $token, name: $name, weight: $weight }) {
		response
	}
}
`;

export const editRabbitsQuery = gql`
mutation editRabbit($token: String, $name: String, $weight: String, $id: Int) {
	editRabbit(input: { token: $token, name: $name, weight: $weight, id: $id }) {
		response
	}
}
`;