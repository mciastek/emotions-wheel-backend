import React from 'react';
import { connect } from 'react-redux';

import { fetchParticipant } from 'actions/participant';

import ParticipantForm from 'containers/ParticipantForm';

class ParticipantContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchParticipant(this.props.id));
  }

  render() {
    const {first_name, last_name, age} = this.props.participant.single;

    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Participant's details</h1>
            <h3 className="page__subtitle">{first_name} {last_name} ({age} years old)</h3>
          </div>
        </header>
        <section className="page__content">
          <ParticipantForm participant={this.props.participant.single} actionType="update" />
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
