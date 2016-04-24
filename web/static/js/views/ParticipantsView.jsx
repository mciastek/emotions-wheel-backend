import React from 'react';

import ParticipantsContainer from 'containers/ParticipantsContainer';
import LinkButton from 'containers/LinkButton';

class ParticipantsView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Participants</h1>
            <h3 className="page__subtitle">List of participants</h3>
          </div>
          <div className="page-header__right">
            <LinkButton label="Add New Participant" primary={true} route="/dashboard/participants/new" />
          </div>
        </header>
        <section className="page__content">
          <ParticipantsContainer />
        </section>
      </section>
    );
  }
}

export default ParticipantsView;
