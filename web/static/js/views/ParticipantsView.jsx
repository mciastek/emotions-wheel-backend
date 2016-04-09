import React from 'react';

import ParticipantsContainer from 'containers/ParticipantsContainer';

class ParticipantsView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page__header">
          <h1 className="page__title">Participants</h1>
          <h3 className="page__subtitle">List of participants</h3>
        </header>
        <section className="page__content">
          <ParticipantsContainer />
        </section>
      </section>
    );
  }
}

export default ParticipantsView;
