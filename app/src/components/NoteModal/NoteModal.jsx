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
      const { title, content } = data && data.note ? data.note : { title: '', content: '' };
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
                <div className="form-group">
                  <label htmlFor="form-title" className="form-label">Title</label>
                  <input type="text" className="form-input" id="form-title" name="title" value={title} />
                </div>
                <div className="form-group">
                  <label htmlFor="form-content" className="form-label">Content</label>
                  <input type="text" className="form-input" id="form-content" name="content" value={content} />
                </div>
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
