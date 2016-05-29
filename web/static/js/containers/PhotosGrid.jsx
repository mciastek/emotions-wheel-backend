import React from 'react';
import { connect } from 'react-redux';

import { GridList, GridTile } from 'material-ui/lib/grid-list';

import DeleteButton from 'components/DeleteButton';

import { fetchPhotos, deleteSinglePhoto } from 'actions/photos';

class PhotosGrid extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
  }

  handleDeleteClick(photoId) {
    this.props.dispatch(deleteSinglePhoto(photoId));
  }

  render() {
    const thumbs = (() => {
      return this.props.photos.collection.map((photo, index) => {
        const button = (<DeleteButton iconColor="white" onTap={this.handleDeleteClick.bind(this, photo.id)} />);

        return (
          <GridTile key={index} title={photo.name} actionIcon={button}>
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
