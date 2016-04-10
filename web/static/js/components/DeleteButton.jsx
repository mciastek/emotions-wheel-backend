import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';

class EditButton extends React.Component {
  handleTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  render() {
    return (
      <IconButton iconStyle={this.props.iconStyle} onTouchTap={this.handleTap.bind(this)}>
        <ActionDelete color={this.props.iconColor} />
      </IconButton>
    );
  }
}

export default EditButton;
