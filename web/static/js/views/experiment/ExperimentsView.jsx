import React from 'react';

import ExperimentsContainer from 'containers/experiment/ExperimentsContainer';
import LinkButton from 'containers/LinkButton';

class ExperimentsView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Experiments</h1>
            <h3 className="page__subtitle">List of experiments</h3>
          </div>
          <div className="page-header__right">
            <LinkButton label="Add New Experiment" primary={true} route="/dashboard/experiments/new" />
          </div>
        </header>
        <section className="page__content">
          <ExperimentsContainer />
        </section>
      </section>
    );
  }
}

export default ExperimentsView;
