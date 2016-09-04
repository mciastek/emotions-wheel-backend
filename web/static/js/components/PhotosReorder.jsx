import 'css/components/photos-selection.scss';

import React from 'react';

import { GridList } from 'material-ui/lib/grid-list';

import PhotosReorderItem from 'components/PhotosReorderItem';

class PhotosReorder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      draggingIndex: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return;

    const { collection = [] } = nextProps;

    this.setState({
      photos: collection
    });
  }

  onReorderPhoto(newState) {
    this.setState(newState);
  }

  render() {
    const thumbs = this.state.photos.map((photo, index) => {

      const itemProps = {
        className: 'photos-selection__item',
        title: photo.name
      };

      return (
        <PhotosReorderItem
          key={index}
          updateState={this.onReorderPhoto.bind(this)}
          items={this.state.photos}
          draggingIndex={this.state.draggingIndex}
          sortId={index}
          outline="list"
          childProps={itemProps}>
          <img src={photo.thumb} alt={photo.name} />
        </PhotosReorderItem>
      );
    });

    return (
      <section className="photos-selection photos-selection--reorder">
        <header className="photos-selection__header">
          <h3 className="photos-selection__title">{this.props.title}</h3>
        </header>
        <GridList className="photos-selection__grid" cellHeight={200} cols={4}>
          {thumbs}
        </GridList>
      </section>
    );
  }
}

export default PhotosReorder;
