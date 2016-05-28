import React from 'react';
import { connect } from 'react-redux';

import { GridList, GridTile } from 'material-ui/lib/grid-list';

import { fetchPhotos } from 'actions/photos';

class PhotosGrid extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPhotos());
  }

  render() {

    const thumbs = (() => {
      this.props.photos.collection.map((photo, index) => {
        return (
          <GridTile key={index} title={photo.name}>
            <img src={photo.url} alt={photo.name} />
          </GridTile>
        );
      });
    })();

    return (
      <GridList cellHeight={200}>
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
