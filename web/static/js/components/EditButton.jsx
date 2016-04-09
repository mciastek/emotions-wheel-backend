import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ImageEdit from 'material-ui/lib/svg-icons/image/edit';

class EditButton extends React.Component {
  handleTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  render() {
    return (
      <IconButton iconStyle={this.props.iconStyle} onTouchTap={this.handleTap.bind(this)}>
        <ImageEdit color={this.props.iconColor} />
      </IconButton>
    );
  }
}

export default EditButton;
