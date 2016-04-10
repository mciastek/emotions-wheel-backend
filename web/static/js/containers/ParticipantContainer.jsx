import React from 'react';
import { connect } from 'react-redux';

import { fetchParticipant } from 'actions/participant';

import ParticipantForm from 'containers/ParticipantForm';

class ParticipantContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchParticipant(this.props.id));
  }

  render() {
    const {first_name, last_name} = this.props.participant.single;

    return (
      <section className="page">
        <header className="page__header">
          <h1 className="page__title">Participant's details</h1>
          <h3 className="page__subtitle">{first_name} {last_name}</h3>
        </header>
        <section className="page__content">
          <ParticipantForm participant={this.props.participant.single} />
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    participant: state.participant
  };
}

export default connect(mapStateToProps)(ParticipantContainer);
