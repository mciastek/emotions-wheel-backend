import 'css/components/wheel-results.scss';

import wheelImg from 'images/wheel.svg';

import React from 'react';
import { GridList, GridTile } from 'material-ui/lib/grid-list';

import PhotoPreviewButton from 'containers/photo/PhotoPreviewButton';

class WheelResults extends React.Component {
  render() {
    const thumbs = (() => {
      return this.props.photos.map((photo, index) => {
        return (
          <GridTile key={index} title={photo.name} actionIcon={<PhotoPreviewButton photo={photo} />}>
            <img src={photo.thumb} alt={photo.name} />
          </GridTile>
        );
      });
    })();

    return (
      <section className="wheel-results">
        <div className="wheel-results__left">
          <img src={wheelImg} className="wheel-results__image" />
        </div>

        <div className="wheel-results__right">
          <GridList cellHeight={200} cols={2}>
            {thumbs}
          </GridList>
        </div>
      </section>
    );
  }
}

export default WheelResults;
