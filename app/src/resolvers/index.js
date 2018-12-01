import gql from 'graphql-tag';

export const defaults = {
  searchLabel: '',
  searchNote: '',
};

export const typeDefs = gql`
  extend type Query {
    searchLabel: String
    searchNote: String
  }
`;
