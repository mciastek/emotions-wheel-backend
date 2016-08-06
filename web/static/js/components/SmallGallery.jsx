import 'css/components/small-gallery.scss';

import React, { PropTypes } from 'react';

import { GridList, GridTile } from 'material-ui/lib/grid-list';

class SmallGallery extends React.Component {
  render() {
    const thumbs = (() => {
      return this.props.photos.map((photo, index) => {
        return (
          <GridTile key={index} title={photo.name}>
            <img src={photo.thumb} alt={photo.name} />
          </GridTile>
        );
      });
    })();

    return (
      <section className="small-gallery">
        <h3 className="small-gallery__title">{this.props.title}</h3>

        <article className="small-gallery__grid">
          <GridList cellHeight={200} cols={4}>
            {thumbs}
          </GridList>
        </article>
      </section>
    );
  }
}

SmallGallery.propTypes = {
  photos: PropTypes.array,
  title: PropTypes.string
};

export default SmallGallery;
