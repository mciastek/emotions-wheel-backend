import React from 'react';
import { connect } from 'react-redux';


class Results extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Results</h1>
        </header>

        <section className="page__content">
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiment: state.experiment,
    participant: state.participant
  };
}

export default connect(mapStateToProps)(Results);
