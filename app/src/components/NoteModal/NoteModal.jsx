/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_NOTE, GET_NOTES } from '../../queries/notes';
import { UPDATE_NOTE, CREATE_NOTE } from '../../mutations/notes';

class NoteModal extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      loaded: false,
    };

    this.setFullState = this.setFullState.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  setFullState({ title, content }) {
    this.setState({
      title,
      content,
      loaded: true,
    });
  }

  onChange({ target: { name, value }}) {
    this.setState({
      [name]: value,
    });
  }

  onSave(mutation) {
    const { title, content } = this.state;
    const { onClose, id } = this.props;
    const variables = { note: { title, content }, id };
    mutation({ variables });
    onClose();
  }

  render() {
    const { id, onClose } = this.props;
    const { title, content, loaded } = this.state;
    return (
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
          if (!loaded && data && data.note) {
            this.setFullState(data.note);
          }
          return (
            <div className="modal active" id="modal-id">
              <a className="modal-overlay" aria-label="Close" onClick={onClose} />
              <div className="modal-container">
                <div className="modal-header">
                  <button className="btn btn-clear float-right" aria-label="Close" onClick={onClose} />
                  <div className="modal-title h5">{id ? 'Edit' : 'New'} Note</div>
                </div>
                <div className="modal-body">
                  <div className="content">
                    <div className="form-group">
                      <label htmlFor="form-title" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-input"
                        id="form-title"
                        name="title"
                        value={title}
                        onChange={this.onChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-content" className="form-label">Content</label>
                      <input
                        type="text"
                        className="form-input"
                        id="form-content"
                        name="content"
                        value={content}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <Mutation mutation={!id ? CREATE_NOTE : UPDATE_NOTE} refetchQueries={[{ query: GET_NOTES }]}>
                    {(mutation) => (
                      <button className="btn btn-primary" onClick={() => this.onSave(mutation)}>Save</button>
                    )}
                  </Mutation>
                  <button className="btn btn-link" onClick={onClose}>Cancel</button>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default NoteModal;
