import gql from 'graphql-tag';

export const INSERT_USER = gql`
  mutation InsertUser(
    $id: uuid!
    $name: String!
    $twitter: String!
    $rocket: String!
  ) {
    insertUsers(
      objects: { id: $id, name: $name, twitter: $twitter, rocket: $rocket }
    ) {
      returning {
        id
        name
        twitter
        rocket
      }
    }
  }
`;
