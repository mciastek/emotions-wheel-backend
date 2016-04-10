import React from 'react';

import Paper from 'material-ui/lib/paper';

import Input from 'components/Input';
import Select from 'components/Select';
import BirthdateField from 'components/BirthdateField';

const genderSelectOptions = [{
  value: 'male',
  label: 'Male'
}, {
  value: 'female',
  label: 'Female'
}];

class ParticipantForm extends React.Component {
  render() {

    const { first_name, last_name, email, gender, birthdate, age } = this.props.participant;

    return (
      <Paper className="page-form">
        <form className="form">
          <div className="form-row--splitted">
            <div className="form-row__column--4">
              <Input ref="first_name" floatingLabelText="First Name" fullWidth={true} value={first_name} />
            </div>
            <div className="form-row__column--4">
              <Input ref="last_name" floatingLabelText="Last Name" fullWidth={true} value={last_name} />
            </div>
            <div className="form-row__column--4">
              <Input ref="email" floatingLabelText="Email" fullWidth={true} value={email} />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--3">
              <Select ref="gender" options={genderSelectOptions} value={gender} floatingLabelText="Gender" />
            </div>
            <div className="form-row__column--6">
              <BirthdateField value={birthdate} />
            </div>
            <div className="form-row__column--3">
              <Input floatingLabelText="Age" fullWidth={true} value={age} disabled={true} />
            </div>
          </div>

        </form>
      </Paper>
    );
  }
}

export default ParticipantForm;
