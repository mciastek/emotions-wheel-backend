import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/lib/dialog';

import { closeCustomDialog } from 'actions/ui';

class CustomDialog extends React.Component {
  handleClose() {
    this.props.dispatch(closeCustomDialog());
  }

  render() {
    return (
      <Dialog
          title={this.props.ui.customDialog.title}
          actions={this.props.ui.customDialog.actions}
          modal={false}
          open={this.props.ui.customDialog.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.props.ui.customDialog.content}
        </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(CustomDialog);
