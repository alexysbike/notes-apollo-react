import React from 'react';
import NoteLabel from './NoteLabel';

const NoteCard = ({ title, content, labels }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h5">{title}</div>
    </div>
    <div className="card-body" title={content}>
      <p>{content.length <= 200 ? content : `${content.substring(0, 190)}...`}</p>
    </div>
    <div className="card-footer">
      {labels.map(({ _id: labelId, name }) => (
        <NoteLabel key={labelId} _id={labelId} name={name} />
      ))}
    </div>
  </div>
);

export default NoteCard;
