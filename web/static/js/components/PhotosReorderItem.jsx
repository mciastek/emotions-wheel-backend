import React from 'react';
import { Sortable } from 'react-sortable';

import { GridTile } from 'material-ui/lib/grid-list';

class PhotosSelectionItem extends React.Component {
  render() {
    return (
      <GridTile {...this.props}>{this.props.children}</GridTile>
    );
  }
}

export default Sortable(PhotosSelectionItem);
