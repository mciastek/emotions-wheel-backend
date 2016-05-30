import React from 'react';
import { connect } from 'react-redux';

import Snackbar from 'material-ui/lib/snackbar';

import { hideNotificationBar } from 'actions/ui';

class NotificationBar extends React.Component {
  handleClose() {
    this.props.dispatch(hideNotificationBar());
  }

  render() {
    return (
      <Snackbar
        open={this.props.ui.notificationBar.visible}
        message={this.props.ui.notificationBar.message}
        autoHideDuration={this.props.ui.notificationBar.hideDuration}
        onRequestClose={this.handleClose.bind(this)}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(NotificationBar);
