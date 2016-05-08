import 'css/components/block-list.scss';

import React, { PropTypes } from 'react';

class BlockList extends React.Component {
  render() {
    const items = this.props.collection.map((item, index) => {
      return (
        <li key={index} className="block-list__item">
          {(this.props.itemLabel) ? this.props.itemLabel(item) : item}
        </li>
      );
    });

    return (
      <ul className="block-list">
        {items}
      </ul>
    );
  }
}

BlockList.propTypes = {
  collection: PropTypes.array.isRequired
};

export default BlockList;
