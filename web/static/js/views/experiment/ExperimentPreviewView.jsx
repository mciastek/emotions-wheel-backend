import React from 'react';

import config from '../../config';

import RaisedButton from 'material-ui/lib/raised-button';
import ExperimentPreview from 'containers/experiment/ExperimentPreview';

class ExperimentPreviewView extends React.Component {
  render() {
    const { id:experimentId } = this.props.params;
    const { url, namespace } = config.api;
    const csvUrl = `${url}/${namespace}/experiments/${experimentId}/rates/csv`;

    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Experiment's preview</h1>
          </div>

          <div className="page-header__right">
            <RaisedButton
              label="Export results as CSV"
              primary={true}
              linkButton={true}
              href={csvUrl} />
          </div>
        </header>
        <section className="page__content">
          <ExperimentPreview id={experimentId} />
        </section>
      </section>
    );
  }
}

export default ExperimentPreviewView;
