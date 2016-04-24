import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';

import Input from 'components/Input';
import InputDate from 'components/InputDate';
import InputTime from 'components/InputTime';

import LinkButton from 'containers/LinkButton';

const radioStyle = {
  float: 'left',
  width: '50%'
};

class ExperimentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
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
                <Input ref="first_name" floatingLabelText="Experiment's Name" fullWidth={true} value={name} />
              </div>
            </div>

            <div className="form-row--splitted space-after">
              <div className="form-row__column--4">
                <label>Choose experiment's mode:</label>
              </div>
              <RadioButtonGroup className="form-row__column--8" name="kind" defaultSelected={kind || 'experiment'}>
                <RadioButton value="experiment" label="Experiment mode" style={radioStyle} />
                <RadioButton value="free_mode" label="Free mode" style={radioStyle} />
              </RadioButtonGroup>
            </div>

            <div className="form-row--splitted">
              <div className="form-row__column--4">
                <label className="form-row__label">Experiment's start:</label>
              </div>

              <div className="form-row__column--4">
                <InputTime ref="start_date_time" hintText="Start time" />
              </div>

              <div className="form-row__column--4">
                <InputDate ref="start_date_date" hintText="Start date" />
              </div>
            </div>

            <div className="form-row--splitted">
              <div className="form-row__column--4">
                <label className="form-row__label">Experiment's end:</label>
              </div>

              <div className="form-row__column--4">
                <InputTime ref="end_date_time" hintText="End time" />
              </div>

              <div className="form-row__column--4">
                <InputDate ref="end_date_date" hintText="End date" />
              </div>
            </div>
        </Paper>
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
