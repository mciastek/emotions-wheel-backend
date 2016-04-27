import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

import ContentForward from 'material-ui/lib/svg-icons/content/forward';
import ContenUndo from 'material-ui/lib/svg-icons/content/undo';

import { createExperiment } from 'actions/experiment';

import Input from 'components/Input';
import DateTimeField from 'components/DateTimeField';

import LinkButton from 'containers/LinkButton';

const radioStyle = {
  float: 'left',
  width: '50%'
};

class ExperimentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      kind,
      start_date,
      end_date
    } = this.refs;

    const requestData = {
      name: name.state.value,
      kind: kind.state.selected,
      start_date: start_date.state.value,
      end_date: end_date.state.value
    };

    this.props.dispatch(createExperiment(requestData));
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
                <Input ref="name" floatingLabelText="Experiment's Name" fullWidth={true} value={name} />
              </div>
            </div>

            <div className="form-row--splitted space-after">
              <div className="form-row__column--4">
                <label>Choose experiment's mode:</label>
              </div>
              <RadioButtonGroup className="form-row__column--8" ref="kind" name="kind" defaultSelected={kind || 'experiment'}>
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

        <div className="form-row--splitted">
          <div className="form-row__column--6">
            <div className="form-row__label">
              All participants
            </div>
            <Paper>
              <List>
                <ListItem primaryText="Inbox" rightIcon={<ContentForward />} />
              </List>
            </Paper>
          </div>
          <div className="form-row__column--6">
            <div className="form-row__label">
              Participants in that experiment
            </div>
            <Paper>
              <List>
                <ListItem primaryText="Inbox" rightIcon={<ContenUndo />} />
              </List>
            </Paper>
          </div>
        </div>

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

export default connect()(ExperimentForm);
