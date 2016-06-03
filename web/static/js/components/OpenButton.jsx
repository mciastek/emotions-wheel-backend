import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionOpenInNew from 'material-ui/lib/svg-icons/action/open-in-new';

class OpenButton extends React.Component {
  handleTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  render() {
    return (
      <IconButton iconStyle={this.props.iconStyle} onTouchTap={this.handleTap.bind(this)}>
        <ActionOpenInNew color={this.props.iconColor} />
      </IconButton>
    );
  }
}

export default OpenButton;
