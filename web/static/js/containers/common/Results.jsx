import React from 'react';
import { connect } from 'react-redux';

import { fetchExperiment } from 'actions/experiment';

import WheelResults from 'components/WheelResults';

class Results extends React.Component {
  componentDidMount() {
    const { experimentId } = this.props.params;

    this.props.dispatch(fetchExperiment(experimentId));
  }

  render() {
    const { photos } = this.props.experiment.single;

    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Results</h1>
        </header>

        <section className="page__content">
          <WheelResults photos={photos} />
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
