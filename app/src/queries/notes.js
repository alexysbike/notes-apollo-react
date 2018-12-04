import gql from 'graphql-tag';

export const GET_NOTES = gql`
  query GetNotes($offset: Int) {
    notes(offset: $offset) {
      docs {
        _id
        title
        content
        labels {
          _id
          name
        }
      }
      total
    }
    searchNote @client
  }
`;

export const GET_NOTE_SEARCH = gql`
  query SearchNote {
    searchNote @client
  }
`;

export const GET_NOTE = gql`
  query GetNote($id: ID!){
    note(id: $id) {
      _id
      title
      content
      labelIds
    }
  }
`;
