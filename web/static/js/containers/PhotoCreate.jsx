import React from 'react';
import { connect } from 'react-redux';

class PhotoCreate extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Add new Photo</h1>
        </header>
        <section className="page__content">
        </section>
      </section>
    );
  }
}

export default connect()(PhotoCreate);
