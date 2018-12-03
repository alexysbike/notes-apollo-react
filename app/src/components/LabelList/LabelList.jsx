import React from 'react';
import { Query } from 'react-apollo';
import LabelItem from './components/LabelItem';
import { GET_LABELS, GET_LABEL_SEARCH } from '../../queries/labels';

const LabelList = () => (
  <Query query={GET_LABEL_SEARCH}>
    {({ data: { searchLabel }, client }) => (
      <div>
        <div className="input-group input-line">
          <input
            type="text"
            className="form-input"
            placeholder="Search label"
            value={searchLabel}
            onChange={({ target: { value } }) => client.writeData({ data: { searchLabel: value }})}
          />
        </div>
        <ul className="menu">
          <li className="divider" data-content="Labels" />
          <Query query={GET_LABELS} variables={{ offset: 0 }}>
            {({ loading, error, data, fetchMore }) => {
              if (loading) return <LabelItem name="Loading..." />;
              if (error) return <LabelItem name="Error..." />;
              const { docs, total } = data.labels;
              if (total > docs.length) {
                fetchMore({
                  variables: {
                    offset: docs.length
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult.labels.docs.length) return prev;
                    return {
                      labels: {
                        ...fetchMoreResult.labels,
                        docs: [...prev.labels.docs, ...fetchMoreResult.labels.docs],
                      }
                    };
                  }
                });
              }
              return docs.filter(doc => doc.name.toLowerCase().includes(searchLabel.toLowerCase())).map(({ _id, name }) => (
                <LabelItem key={_id} name={name} />
              ));
            }}
          </Query>
        </ul>
      </div>
    )}
  </Query>
);

export default LabelList;
