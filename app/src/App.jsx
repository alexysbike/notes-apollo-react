import React, { Component } from 'react';
import Navbar from './components/Navbar';
import NoteList from './components/NoteList';
import LabelList from './components/LabelList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="columns">
          <div className="column col-3">
            <LabelList />
          </div>
          <div className="column col-9">
            <NoteList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
