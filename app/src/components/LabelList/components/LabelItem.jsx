import React from 'react';

const LabelItem = ({ name }) => (
  <li className="menu-item">
    <a href="/#">
      {name}
    </a>
  </li>
);

export default LabelItem;
