import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import Input from 'components/Input';

import LinkButton from 'containers/LinkButton';

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
      <Paper className="page-form">
        <form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate>
          <div className="form-row--splitted">
            <div className="form-row__column--12">
              <Input ref="first_name" floatingLabelText="Experiment's Name" fullWidth={true} value={name} />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--4"></div>
            <div className="form-row__column--4">
              <RaisedButton type="submit" label="Save" secondary={true} fullWidth={true} />
            </div>
            <div className="form-row__column--4">
              <LinkButton label="Cancel" parimary={true} fullWidth={true} route="/dashboard/experiments" />
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

export default connect()(ExperimentForm);
