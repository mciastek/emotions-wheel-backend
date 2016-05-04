import React from 'react';
import { connect } from 'react-redux';

import QRCode from 'qrcode.react';

import Dialog from 'material-ui/lib/dialog';

import { closeQrDialog } from 'actions/ui';

class QrDialog extends React.Component {
  handleClose() {
    this.props.dispatch(closeQrDialog());
  }

  render() {
    return (
      <Dialog
        title="QR Code"
        modal={false}
        open={this.props.ui.qrDialog.open}
        onRequestClose={this.handleClose.bind(this)}
        >
          <QRCode value={this.props.ui.qrDialog.value || ''} />
        </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(QrDialog);
