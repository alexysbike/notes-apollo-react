import React from 'react';
import { Query } from 'react-apollo';
import NoteCard from './components/NoteCard';
import { GET_NOTES } from '../../queries/notes';

const NoteList = () => (
  <div className="columns">
    <Query query={GET_NOTES}>
      {({ loading, error, data: { notes } }) => {
        if (loading) return (
          <div className="column col-4">
            Loading...
          </div>
        );
        if (error) return (
          <div className="column col-4">
            Error...
          </div>
        );
        return notes.map(({ _id, title, content, labels }) => (
          <div className="column col-4" key={_id}>
            <NoteCard title={title} content={content} labels={labels} />
          </div>
        ));
      }}
    </Query>
  </div>
);

export default NoteList;
