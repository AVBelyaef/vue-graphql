import gql from 'graphql-tag';

export const GET_ROCKETS = gql`
  query getRockets {
    rockets {
      id
      name
    }
  }
`;

export const GET_ROCKET = gql`
  query getRocket($id: ID!) {
    rocket(id: $id) {
      id
      name
      description
      costPerLaunch: cost_per_launch
    }
  }
`;
