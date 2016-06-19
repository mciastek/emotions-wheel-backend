import config from '../../config';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';

import { fetchExperiment } from 'actions/experiment';

import BlockList from 'components/BlockList';
import LinkButton from 'containers/LinkButton';

class ExperimentPreview extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchExperiment(this.props.id));
  }

  blockListItemLabel(participant) {
    return `${participant.first_name} ${participant.last_name} (${participant.age})`;
  }

  render() {
    const {
      name,
      kind,
      start_date,
      end_date,
      participants = []
    } = this.props.experiment.single;

    return (
      <div>
        <Paper className="page-details">
          <p className="page-details__row">
            <strong className="page-details__label">Name:</strong>
            <span className="page-details__text">{name}</span>
          </p>

          <p className="page-details__row">
            <strong className="page-details__label">Kind:</strong>
            <span className="page-details__text">{kind}</span>
          </p>

          <p className="page-details__row">
            <strong className="page-details__label">Start date:</strong>
            <span className="page-details__text">{moment(start_date).format(config.date.formatDateTime)}</span>
          </p>

          <p className="page-details__row">
            <strong className="page-details__label">End date:</strong>
            <span className="page-details__text">{moment(end_date).format(config.date.formatDateTime)}</span>
          </p>

          <p className="page-details__row">
            <strong className="page-details__label">Participants</strong>
            <span className="page-details__text">{participants.length}</span>
          </p>
        </Paper>

        <Paper className="page-details">
          <h3 className="page-details__title">Participants list</h3>

          <BlockList collection={participants} itemLabel={this.blockListItemLabel} />
        </Paper>

        <div className="page-actions">
          <div className="page-actions__row">
            <div className="page-actions__column--right">
              <LinkButton label="Back" parimary={true} fullWidth={true} route="/dashboard/experiments" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    experiment: state.experiment
  };
}

export default connect(mapStateToProps)(ExperimentPreview);
