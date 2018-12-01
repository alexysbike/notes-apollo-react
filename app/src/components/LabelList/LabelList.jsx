import React from 'react';
import { Query } from 'react-apollo';
import LabelItem from './components/LabelItem';
import { GET_LABELS } from '../../queries/labels';

const LabelList = () => (
  <div>
    <div className="input-group input-line">
      <input type="text" className="form-input" placeholder="Search label" />
    </div>
    <ul className="menu">
      <li className="divider" data-content="Labels" />
      <Query query={GET_LABELS}>
        {({ loading, error, data: { labels } }) => {
          if (loading) return <LabelItem name="Loading..." />;
          if (error) return <LabelItem name="Error..." />;
          return labels.map(({ _id, name }) => (
            <LabelItem key={_id} name={name} />
          ));
        }}
      </Query>
    </ul>
  </div>
);

export default LabelList;
