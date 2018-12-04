import React from 'react';
import { Query } from 'react-apollo';
import NoteCard from './components/NoteCard';
import NoteModal from '../NoteModal';
import { GET_NOTES } from '../../queries/notes';

const NoteList = () => (
  <div className="columns">
    <NoteModal id="5c059abe857d6b3dd893c901" />
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
        console.log('pongo aqui', data.notes.docs);
        console.log('pongo aqui 2', data.notes.total);
        const { searchNote } = data;
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
  </div>
);

export default NoteList;
