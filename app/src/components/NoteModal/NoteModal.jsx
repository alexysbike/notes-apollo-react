import React from 'react';
import { Query } from 'react-apollo';
import { GET_NOTE } from '../../queries/notes';

const NoteModal = ({ id }) => (
  <Query query={GET_NOTE} variables={{ id }} skip={!id}>
    {({ loading, error, data }) => {
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
      const { title } = data ? data.note : { title: '' };
      return (
        <div className="modal active" id="modal-id">
          <a href="#close" className="modal-overlay" aria-label="Close" />
          <div className="modal-container">
            <div className="modal-header">
              <a href="#close" className="btn btn-clear float-right" aria-label="Close" />
              <div className="modal-title h5">{id ? 'Edit' : 'New'} Note</div>
            </div>
            <div className="modal-body">
              <div className="content">
                <h1>{title}</h1>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary">Save</button>
              <button className="btn btn-link">Cancel</button>
            </div>
          </div>
        </div>
      );
    }}
  </Query>
);

export default NoteModal;
