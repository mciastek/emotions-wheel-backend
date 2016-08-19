import config from '../../config';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import { fetchExperiment } from 'actions/experiment';
import { fetchRatesSuccess, deleteRatesForParticipant } from 'actions/rates';
import { showNotificationBar, setNotificationBarContent } from 'actions/ui';

import BlockList from 'components/BlockList';
import LinkButton from 'containers/common/LinkButton';

const deleteButtonStyle = {
  marginLeft: 15
};

class ExperimentPreview extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchExperiment(this.props.id));
  }

  blockListItemLabel(participant) {
    return `${participant.first_name} ${participant.last_name} (${participant.age})`;
  }

  blockListItemAction(participant) {
    const experiment = this.props.experiment.single;
    const route = `/dashboard/experiments/${experiment.id}/participants/${participant.id}/results`;

    return (
      <div>
        <LinkButton label="Results" secondary={true} route={route} />
        <RaisedButton
          label="Delete results"
          style={deleteButtonStyle}
          onTouchTap={this.deleteRates.bind(this, experiment.id, participant)} />
      </div>
    );
  }

  deleteRates(experimentId, participant) {
    const fullName = `${participant.first_name} ${participant.last_name}`;

    this.props.dispatch(deleteRatesForParticipant(experimentId, participant.id))
      .then(({ deleted_number }) => {
        this.props.dispatch(fetchRatesSuccess([]));

        this.props.dispatch(setNotificationBarContent({
          message: `${fullName}'s deleted rates: ${deleted_number}`
        }));

        this.props.dispatch(showNotificationBar());
      });
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

          <BlockList collection={participants} itemLabel={this.blockListItemLabel} itemAction={this.blockListItemAction.bind(this)} />
        </Paper>

        <div className="page-actions">
          <div className="page-actions__row">
            <div className="page-actions__column--right">
              <LinkButton label="Back" fullWidth={true} route="/dashboard/experiments" />
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
