import React from 'react';
import { connect } from 'react-redux';

import { GridList, GridTile } from 'material-ui/lib/grid-list';
import RaisedButton from 'material-ui/lib/raised-button';

import DeleteButton from 'components/DeleteButton';

import PhotoPreviewButton from 'containers/PhotoPreviewButton';

import { fetchPhotos, deleteSinglePhoto } from 'actions/photos';

import {
  openCustomDialog,
  closeCustomDialog,
  setCustomDialogContent,
  showNotificationBar,
  setNotificationBarContent
} from 'actions/ui';

const confirmButtonStyle = {
  marginLeft: 10
};

class PhotosGrid extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
  }

  handleModalConfirmClick(photo) {
    this.deletePhoto(photo);
  }

  handleDeleteClick(photo) {
    const actions = [
      <RaisedButton label="Cancel" secondary={true} onTouchTap={() => this.props.dispatch(closeCustomDialog())} />,
      <RaisedButton label="Delete" primary={true} style={confirmButtonStyle} onTouchTap={this.handleModalConfirmClick.bind(this, photo)} />
    ];

    this.props.dispatch(openCustomDialog());

    this.props.dispatch(setCustomDialogContent({
      title: `Delete ${photo.name}`,
      content: 'Are you sure that you want to delete that file?',
      actions: actions
    }));
  }

  deletePhoto(photo) {
    this.props.dispatch(deleteSinglePhoto(photo.id))
      .then(() => {
        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `Photo: "${photo.name}" deleted!`
        }));

        this.props.dispatch(closeCustomDialog());
      });
  }

  tileButtons(photo) {
    return (
      <div>
        <PhotoPreviewButton photo={photo} />
        <DeleteButton iconColor="white" onTap={this.handleDeleteClick.bind(this, photo)} />
      </div>
    );
  }

  render() {
    const thumbs = (() => {
      return this.props.photos.collection.map((photo, index) => {
        const buttons = this.tileButtons(photo);

        return (
          <GridTile key={index} title={photo.name} actionIcon={buttons}>
            <img src={photo.url} alt={photo.name} />
          </GridTile>
        );
      });
    })();

    return (
      <GridList cellHeight={200} cols={4}>
        {thumbs}
      </GridList>
    );
  }
}

function mapStateToProps(state) {
  return {
    photos: state.photos
  };
}

export default connect(mapStateToProps)(PhotosGrid);
