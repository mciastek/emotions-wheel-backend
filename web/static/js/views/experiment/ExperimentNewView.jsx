import React from 'react';

import ExperimentForm from 'containers/experiment/ExperimentForm';

class ExperimentNewView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Add new Experiment</h1>
        </header>
        <section className="page__content">
          <ExperimentForm experiment={{}} actionType="create" />
        </section>
      </section>
    );
  }
}

export default ExperimentNewView;
