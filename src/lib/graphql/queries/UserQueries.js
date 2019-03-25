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