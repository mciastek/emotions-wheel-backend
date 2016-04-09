import React from 'react';
import { connect } from 'react-redux';

import { fetchParticipant } from 'actions/participant';

class ParticipantContainer extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchParticipant(this.props.id));
  }

  render() {
    const {first_name, last_name} = this.props.participant.single;

    return (
      <section className="page">
        <header className="page__header">
          <h1 className="page__title">{first_name} {last_name}</h1>
        </header>
        <section className="page__content">

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
