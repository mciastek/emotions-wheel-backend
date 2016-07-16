import 'css/components/wheel-results.scss';

import wheelImg from 'images/wheel.svg';

import React from 'react';

class WheelResults extends React.Component {
  handleButtonClick(photo) {
    if (this.props.photoClickHandler) {
      this.props.photoClickHandler(photo);
    }
  }

  render() {
    const thumbs = (() => {
      return this.props.photos.map((photo, index) => {
        const style = {
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
    })();

    return (
      <section className="wheel-results">
        <div className="wheel-results__board">
          {thumbs}
          <img src={wheelImg} className="wheel-results__image" />
        </div>
      </section>
    );
  }
}

export default WheelResults;
