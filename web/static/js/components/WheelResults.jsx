import 'css/components/wheel-results.scss';

import wheelImg from 'images/wheel.svg';

import React from 'react';

class WheelResults extends React.Component {
  render() {
    return (
      <section className="wheel-results">
        <div className="wheel-results__left">
          <img src={wheelImg} className="wheel-results__image" />
        </div>

        <div className="wheel-results__right">

        </div>
      </section>
    );
  }
}

export default WheelResults;
