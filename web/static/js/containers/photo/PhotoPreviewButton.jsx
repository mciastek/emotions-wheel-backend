import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { openPhotoFullPreview, setPhotoFullPreviewContent } from 'actions/ui';

import OpenButton from 'components/OpenButton';

class PhotoPreviewButton extends React.Component {
  handleClick(photo) {
    this.props.dispatch(openPhotoFullPreview());
    this.props.dispatch(setPhotoFullPreviewContent(photo.original));
  }

  render() {
    return (
      <OpenButton iconColor="white" onTap={this.handleClick.bind(this, this.props.photo)} />
    );
  }
}

PhotoPreviewButton.propTypes = {
  photo: PropTypes.object.isRequired
}

export default connect()(PhotoPreviewButton);
