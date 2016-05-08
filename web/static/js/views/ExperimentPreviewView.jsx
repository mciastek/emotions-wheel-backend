import React from 'react';

import ExperimentPreview from 'containers/ExperimentPreview';

class ExperimentPreviewView extends React.Component {
  render() {
    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Experiment's preview</h1>
          </div>
        </header>
        <section className="page__content">
          <ExperimentPreview id={this.props.params.id} />
        </section>
      </section>
    );
  }
}

export default ExperimentPreviewView;
