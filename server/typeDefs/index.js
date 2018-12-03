const {gql} = require('apollo-server');

module.exports = gql`
  type Label {
    _id: ID!
    name: String!
  }
  
  type LabelConnection {
    docs: [Label!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    labelIds: [String!]!
    labels: [Label!]!
  }
  
  type NoteConnection {
    docs: [Note!]!
    total: Int!
    limit: Int!
    offset: Int!
  }

  type Query {
    labels(filter: String, offset: Int = 0, limit: Int = 10): LabelConnection!
    notes(filter: String, offset: Int = 0, limit: Int = 10): NoteConnection!
    label(id: String!): Label
    note(id: String!): Note
  }

  input LabelInput {
    name: String!
  }

  input NoteInput {
    title: String
    content: String
    labelIds: [String!]
  }

  type Response {
    operation: Boolean
  }

  type Mutation {
    createLabel(label: LabelInput): Label!
    updateLabel(id: String, label: LabelInput): Label!
    removeLabel(id: String!): Response!
    createNote(note: NoteInput): Note!
    updateNote(id: String, note: NoteInput, overwrite: Boolean = false): Note!
    removeNote(id: String!): Response!
  }
`;
