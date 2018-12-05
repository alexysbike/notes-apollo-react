import gql from 'graphql-tag';

export const UPDATE_NOTE = gql`
  mutation UpdateNote($id: String!, $note: NoteInput!) {
    updateNote(id: $id, note: $note) {
      _id
      title
      content
      labelIds
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(note: $note) {
      _id
      title
      content
      labelIds
    }
  }
`;
