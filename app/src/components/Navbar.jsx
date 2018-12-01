import React from 'react';
import { Query, ApolloConsumer } from 'react-apollo';
import { GET_NOTE_SEARCH } from '../queries/notes';

const Navbar = () => (
  <header className="navbar">
    <section className="navbar-section">
      <a href="/#" className="navbar-brand mr-2">Notes App</a>
    </section>
    <section className="navbar-section">
      <div className="input-group input-line">
        <Query query={GET_NOTE_SEARCH}>
          {({ data: { searchNote }, client }) => (
            <input
              type="text"
              className="form-input"
              placeholder="Search note"
              value={searchNote}
              onChange={({ target: { value } }) => client.writeData({ data: { searchNote: value }})}
            />
          )}
        </Query>
      </div>
    </section>
  </header>
);

export default Navbar;
