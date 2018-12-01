import React from 'react';

const NoteLabel = ({ _id, name }) => (
  <span className="chip" onClick={() => console.log(_id, name)}>
    {name}
  </span>
);

export default NoteLabel;
