import React from 'react';

import ParticipantForm from 'containers/participant/ParticipantForm';

class ParticipantNewView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Add new Participant</h1>
        </header>
        <section className="page__content">
          <ParticipantForm participant={{}} actionType="create" />
        </section>
      </section>
    );
  }
}

export default ParticipantNewView;
