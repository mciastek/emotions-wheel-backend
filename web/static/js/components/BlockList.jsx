import 'css/components/block-list.scss';

import React, { PropTypes } from 'react';

class BlockList extends React.Component {
  render() {

    const items = this.props.collection.map((item, index) => {
      const itemAction = (item) => {
        return (
          <div className="block-list__item-right">
            {this.props.itemAction(item)}
          </div>
        );
      };

      return (
        <li key={index} className="block-list__item">
          <div className="block-list__item-left">
            {(this.props.itemLabel) ? this.props.itemLabel(item) : item}
          </div>

          {(this.props.itemAction) ? itemAction(item) : null}
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
