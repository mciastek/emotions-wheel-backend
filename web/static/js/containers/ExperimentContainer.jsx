import React from 'react';
import { connect } from 'react-redux';

import { fetchExperiment } from 'actions/experiment';

import ExperimentForm from 'containers/ExperimentForm';

class ExperimentContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchExperiment(this.props.id));
  }

  render() {
    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Experiment's details</h1>
          </div>
        </header>
        <section className="page__content">
          <ExperimentForm experiment={this.props.experiment.single} actionType="update" />
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiment: state.experiment
  };
}

export default connect(mapStateToProps)(ExperimentContainer);
