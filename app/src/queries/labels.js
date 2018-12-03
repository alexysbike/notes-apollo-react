import gql from 'graphql-tag';

export const GET_LABELS = gql`
  query GetLabels($offset: Int) {
    labels(offset: $offset) {
      docs {
        _id
        name
      }
      total
    }
  }
`;

export const GET_LABEL_SEARCH = gql`
  query SearchLabel {
    searchLabel @client
  }
`;
