import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';
import IconButton from 'material-ui/lib/icon-button';

import * as Colors from 'material-ui/lib/styles/colors';

import ActionOpenInNew from 'material-ui/lib/svg-icons/action/open-in-new';

import { createExperiment, updateExperiment } from 'actions/experiment';
import { fetchParticipants } from 'actions/participants';
import { openQrDialog, setQrDialogValue, showNotificationBar, setNotificationBarContent } from 'actions/ui';

import Input from 'components/Input';
import DateTimeField from 'components/DateTimeField';
import DualListbox from 'components/DualListbox';

import LinkButton from 'containers/LinkButton';

const radioStyle = {
  float: 'left',
  width: '50%'
};

class ExperimentForm extends React.Component {
  componentDidMount() {

    // Fetch all free participants
    this.props.dispatch(fetchParticipants(true));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { id: experimentId } = this.props.experiment;

    const {
      name,
      kind,
      start_date,
      end_date,
      participants_ids
    } = this.refs;

    const requestData = {
      name: name.state.value,
      kind: kind.state.selected,
      start_date: start_date.state.value,
      end_date: end_date.state.value,
      researcher_id: this.props.session.currentUser.id,
      participants_ids: participants_ids.state.selection
    };

    if (this.props.actionType === 'create') {
      this.createExperiment(requestData);
    } else {
      this.updateExperiment(experimentId, requestData);
    }
  }

  createExperiment(params) {
    this.props.dispatch(createExperiment(params))
      .then(() => {
        this.props.dispatch(push('/dashboard/experiments'));

        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `New experiment created!`
        }));
      });
  }

  updateExperiment(id, params) {
    this.props.dispatch(updateExperiment(id, params))
      .then(() => {
        this.props.dispatch(fetchParticipants(true));

        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `Experiment "${params.name}" updated!`
        }));
      });
  }

  openDialog(dialogValue) {
    this.props.dispatch(setQrDialogValue(dialogValue));
    this.props.dispatch(openQrDialog());
  }

  listItemLabel(participant) {
    return `${participant.first_name} ${participant.last_name} (${participant.age})`;
  }

  dialogButton(item) {
    const { experiment_uuid } = item;

    if (experiment_uuid) {
      return (
        <IconButton onTouchTap={this.openDialog.bind(this, experiment_uuid)}>
          <ActionOpenInNew color={Colors.grey500} />
        </IconButton>
      );
    }
  }

  render() {
    const {
      name,
      kind,
      start_date,
      end_date
    } = this.props.experiment;

    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate>
        <Paper className="page-form">
          <div className="form-row--splitted space-after">
            <div className="form-row__column--12">
              <Input ref="name" floatingLabelText="Experiment's Name" value={name} />
            </div>
          </div>

          <div className="form-row--splitted space-after">
            <div className="form-row__column--4">
              <label>Choose experiment's mode:</label>
            </div>
            <RadioButtonGroup className="form-row__column--8" ref="kind" name="kind" valueSelected={kind || 'experiment'}>
              <RadioButton value="experiment" label="Experiment mode" style={radioStyle} />
              <RadioButton value="free_mode" label="Free mode" style={radioStyle} />
            </RadioButtonGroup>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--4">
              <label className="form-row__label">Experiment's start:</label>
            </div>

            <div className="form-row__column--8">
              <DateTimeField ref="start_date" timeLabel="Start time" dateLabel="Start date" value={start_date} />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--4">
              <label className="form-row__label">Experiment's end:</label>
            </div>

            <div className="form-row__column--8">
              <DateTimeField ref="end_date" timeLabel="End time" dateLabel="End date" value={end_date} />
            </div>
          </div>
        </Paper>

        <DualListbox
          ref="participants_ids"
          leftLabel="All participants"
          rightLabel="Participants in that experiment"
          collection={this.props.participants.collection}
          selected={this.props.experiment.attached_participants}
          selectBy="id"
          rightListItemAction={this.dialogButton.bind(this)}
          listItemLabel={this.listItemLabel} />

        <div className="form-row--splitted form-row--submit">
          <div className="form-row__column--4"></div>
          <div className="form-row__column--4">
            <RaisedButton type="submit" label="Save" secondary={true} fullWidth={true} />
          </div>
          <div className="form-row__column--4">
            <LinkButton label="Cancel" parimary={true} fullWidth={true} route="/dashboard/experiments" />
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    participants: state.participants,
    session: state.session
  };
}

export default connect(mapStateToProps)(ExperimentForm);
