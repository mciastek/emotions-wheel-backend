import 'css/containers/photo-full-preview.scss';

import React from 'react';
import { connect } from 'react-redux';

import Dialog from 'material-ui/lib/dialog';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import { closePhotoFullPreview } from 'actions/ui';

const contentStyle = {
  width: 'auto',
  maxWidth: '50%'
};

const closeButtonStyle = {
  position: 'absolute'
};

class PhotoFullPreview extends React.Component {
  handleClose() {
    this.props.dispatch(closePhotoFullPreview());
  }

  render() {
    return (
      <Dialog
        className="photo-full-preview"
        modal={false}
        open={this.props.ui.photoFullPreview.open}
        onRequestClose={this.handleClose.bind(this)}
        contentStyle={contentStyle} >
        <FloatingActionButton
          className="photo-full-preview__close"
          zDepth={0}
          mini={true}
          secondary={true}
          onTouchTap={this.handleClose.bind(this)}
          style={closeButtonStyle} >
          <NavigationClose/>
        </FloatingActionButton>
        <img src={this.props.ui.photoFullPreview.image} className="photo-full-preview__photo" />
      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    ui: state.ui
  };
}

export default connect(mapStateToProps)(PhotoFullPreview);
