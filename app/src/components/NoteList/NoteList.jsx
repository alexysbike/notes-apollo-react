import React, { Component } from 'react';
import { Query } from 'react-apollo';
import memoize from 'fast-memoize';
import NoteCard from './components/NoteCard';
import NoteModal from '../NoteModal';
import { GET_NOTES } from '../../queries/notes';

// Used to improve performance
const noteRender = memoize((docs, lowerSN, onEdit) =>
  docs
    .filter(({title, content, labels}) =>
      title.toLowerCase().includes(lowerSN) ||
      content.toLowerCase().includes(lowerSN) ||
      labels.find(({name}) => name.toLowerCase().includes(lowerSN))
    )
    .map(({_id, title, content, labels}) => (
      <div className="column col-4" key={_id}>
        <NoteCard
          id={_id}
          title={title}
          content={content}
          labels={labels}
          onEdit={onEdit}
        />
      </div>
    )));

class NoteList extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      editId: null,
    };

    this.editNote = this.editNote.bind(this);
    this.closeEditNote = this.closeEditNote.bind(this);
  }

  editNote(editId = null) {
    this.setState({
      editId,
      isOpen: true,
    });
  }

  closeEditNote() {
    this.setState({
      editId: null,
      isOpen: false,
    });
  }

  render() {
    const { editId, isOpen } = this.state;
    return (
      <div>
        <button className="btn btn-primery" onClick={() => this.editNote()}>New</button>
        <div className="columns">
          {isOpen && <NoteModal id={editId} onClose={this.closeEditNote} />}
          <Query query={GET_NOTES}>
            {({loading, error, data, fetchMore}) => {
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
              const {searchNote} = data;
              const {docs, total} = data.notes;
              if (total > docs.length) {
                fetchMore({
                  variables: {
                    offset: docs.length
                  },
                  updateQuery: (prev, {fetchMoreResult}) => {
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
              return noteRender(docs, lowerSN, this.editNote);
            }}
          </Query>
        </div>
      </div>
    );
  }
}

export default NoteList;
