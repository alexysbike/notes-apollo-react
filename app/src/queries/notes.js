import gql from 'graphql-tag';

export const GET_NOTES = gql`
  query GetNotes {
    notes {
      _id
      title
      content
      labels {
        _id
        name
      }
    }
  }
`;
