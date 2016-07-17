import 'css/components/wheel-results.scss';

import wheelImg from 'images/wheel.svg';

import React from 'react';
import { GridList, GridTile } from 'material-ui/lib/grid-list';
import Divider from 'material-ui/lib/divider';

class WheelResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ratedPhotos: []
    };
  }

  componentWillReceiveProps({ photos, rates }) {
    this.setState({
      ratedPhotos: this.ratedList(photos, rates)
    });
  }

  ratedList(photos, rates) {
    return photos.reduce((acc, photo) => {
      const rate = this.rateByPhoto(photo, rates);

      if (rate) {
        acc.push({
          ...photo,
          pos_x: rate.pos_x,
          pos_y: rate.pos_y,
          start_time: rate.start_time,
          end_time: rate.end_time,
          time: rate.time
        });
      }

      return acc;
    }, []);
  }

  rateByPhoto(photo, rates) {
    return rates.find((rate) => photo.id === rate.photo_id);
  }

  handleButtonClick(photo) {
    if (this.props.photoClickHandler) {
      this.props.photoClickHandler(photo);
    }
  }

  thumbsOnBoad() {
    return this.state.ratedPhotos.map((photo, index) => {
      const style = {
        top: `${photo.pos_y * 100}%`,
        left: `${photo.pos_x * 100}%`,
        backgroundImage: `url(${photo.thumb})`
      };

      return (
        <button
          key={index}
          className="wheel-results__photo"
          style={style}
          title={photo.name}
          onClick={this.handleButtonClick.bind(this, photo)}></button>
      );
    });
  }

  asideThumbs() {
    return this.props.photos.map((photo, index) => {
      const rate = this.rateByPhoto(photo, this.props.rates);

      const style = {
        opacity: (rate) ? 0.5 : 1
      };

      return (
        <GridTile key={index} title={photo.name} style={style}>
          <img src={photo.thumb} alt={photo.name} />
        </GridTile>
      );
    });
  }

  render() {
    return (
      <section className="wheel-results">
        <section className="wheel-results__board">
          {this.thumbsOnBoad()}
          <img src={wheelImg} className="wheel-results__image" />
        </section>

        <aside className="wheel-results-photos-grid">
          <header className="wheel-results-photos-grid__header">
            <h3 className="wheel-results-photos-grid__title">Photos in experiment</h3>
          </header>
          <GridList cellHeight={200} cols={4}>
            {this.asideThumbs()}
          </GridList>
        </aside>
      </section>
    );
  }
}

export default WheelResults;
