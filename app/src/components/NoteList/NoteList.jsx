import React from 'react';
import { Query } from 'react-apollo';
import NoteCard from './components/NoteCard';
import { GET_NOTES, GET_NOTE_SEARCH } from '../../queries/notes';

const NoteList = () => (
  <div className="columns">
    <Query query={GET_NOTE_SEARCH}>
      {({ data: { searchNote } }) => (
        <Query query={GET_NOTES}>
          {({ loading, error, data, fetchMore }) => {
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
            const { docs, total } = data.notes;
            if (total > docs.length) {
              fetchMore({
                variables: {
                  offset: docs.length
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                  if (!fetchMoreResult.notes.docs.length) return prev;
                  return {
                    notes: {
                      ...fetchMoreResult.notes,
                      docs: [...prev.notes.docs, ...fetchMoreResult.notes.docs],
                    }
                  };
                }
              });
            }
            const lowerSN = searchNote.toLowerCase();
            return docs
              .filter(({ title, content, labels }) =>
                title.toLowerCase().includes(lowerSN) ||
                content.toLowerCase().includes(lowerSN) ||
                labels.find(({ name }) => name.toLowerCase().includes(lowerSN))
              )
              .map(({ _id, title, content, labels }) => (
                <div className="column col-4" key={_id}>
                  <NoteCard title={title} content={content} labels={labels} />
                </div>
              ));
          }}
        </Query>
      )}
    </Query>
  </div>
);

export default NoteList;
