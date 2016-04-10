import React from 'react';

import Paper from 'material-ui/lib/paper';

import Input from 'components/Input';

class ParticipantForm extends React.Component {
  render() {

    const { first_name, last_name, email } = this.props.participant;

    return (
      <Paper className="page-form">
        <form className="form">
          <div className="form-row--splitted">
            <div className="form-row__column--6">
              <Input ref="first_name" floatingLabelText="First Name" fullWidth={true} value={first_name} />
            </div>
            <div className="form-row__column--6">
              <Input ref="last_name" floatingLabelText="Last Name" fullWidth={true} value={last_name} />
            </div>
          </div>

          <div className="form-row">
            <Input ref="email" floatingLabelText="Email" fullWidth={true} value={email} />
          </div>

        </form>
      </Paper>
    );
  }
}

export default ParticipantForm;
