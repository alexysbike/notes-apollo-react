import React from 'react';
import NoteLabel from './NoteLabel';

const NoteCard = ({ id, title, content, labels, onEdit }) => (
  <div className="card">
    <div className="card-header">
      <div className="card-title h5">{title}</div>
    </div>
    <div className="card-body" title={content}>
      <p>{content.length <= 200 ? content : `${content.substring(0, 190)}...`}</p>
      <div>
        {labels.map(({ _id: labelId, name }) => (
          <NoteLabel key={labelId} _id={labelId} name={name} />
        ))}
      </div>
    </div>
    <div className="card-footer">
      <div className="btn-group btn-group-block">
        <button className="btn" onClick={() => onEdit(id)}>Edit</button>
      </div>
    </div>
  </div>
);

export default NoteCard;
