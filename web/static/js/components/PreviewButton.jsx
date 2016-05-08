import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import ActionPageView from 'material-ui/lib/svg-icons/action/pageview';

class PreviewButton extends React.Component {
  handleTap() {
    if (this.props.onTap) {
      this.props.onTap();
    }
  }

  render() {
    return (
      <IconButton iconStyle={this.props.iconStyle} onTouchTap={this.handleTap.bind(this)}>
        <ActionPageView color={this.props.iconColor} />
      </IconButton>
    );
  }
}

export default PreviewButton;
