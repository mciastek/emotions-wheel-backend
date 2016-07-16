import React from 'react';
import { connect } from 'react-redux';

import { fetchExperiment } from 'actions/experiment';
import { fetchParticipant } from 'actions/participant';

import LinkButton from 'containers/common/LinkButton';

import WheelResults from 'components/WheelResults';

class Results extends React.Component {
  componentDidMount() {
    const { experimentId, participantId } = this.props.params;

    this.props.dispatch(fetchExperiment(experimentId));
    this.props.dispatch(fetchParticipant(participantId));
  }

  render() {
    const { experimentId } = this.props.params;
    const { first_name, last_name } = this.props.participant.single;
    const { name:experimentName, photos = [] } = this.props.experiment.single;

    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Results for {first_name} {last_name}</h1>
            <h3 className="page__subtitle">Experiment: "{experimentName}"</h3>
          </div>

          <div className="page-header__right">
            <LinkButton label="Back to experiment" primary={true} fullWidth={true} route={`/dashboard/experiments/${experimentId}`} />
          </div>
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