import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import Input from 'components/Input';
import InputSearch from 'components/InputSearch';
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
  handleSubmit(e) {
    e.preventDefault();
  }

  handleCancel() {
    this.props.dispatch(push('/dashboard/participants'))
  }

  getCityByName(name) {
    return this.props.cities.collection.find(city => city.name === name);
  }

  getCityById(id) {
    return this.props.cities.collection.find(city => city.id === id);
  }

  render() {
    const {
      first_name,
      last_name,
      email,
      gender,
      birthdate,
      age,
      language_id,
      country_id,
      city_id
    } = this.props.participant;

    const languageSelectOptions = this.props.languages.collection.map((language) => {
      return {
        value: language.id,
        label: language.name
      };
    });

    const countrySelectOptions = this.props.countries.collection.map((country) => {
      return {
        value: country.id,
        label: country.name
      };
    });

    const cityOptions = this.props.cities.collection.map((city) => {
      return city.name;
    });

    const {name: citySearchText} = this.getCityById(city_id) || {};

    return (
      <Paper className="page-form">
        <form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate>
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
              <BirthdateField ref="birthdate" value={birthdate} />
            </div>
            <div className="form-row__column--3">
              <Input floatingLabelText="Age" fullWidth={true} value={age} disabled={true} />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--3">
              <Select ref="language_id" options={languageSelectOptions} value={language_id} floatingLabelText="Language" />
            </div>
            <div className="form-row__column--3">
              <Select ref="country_id" options={countrySelectOptions} value={country_id} floatingLabelText="Country" />
            </div>
            <div className="form-row__column--3">
              <InputSearch ref="city_id" dataSource={cityOptions} value={citySearchText} floatingLabelText="City" />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--4"></div>
            <div className="form-row__column--4">
              <RaisedButton type="submit" label="Save" secondary={true} fullWidth={true} />
            </div>
            <div className="form-row__column--4">
              <RaisedButton label="Cancel" parimary={true} fullWidth={true} onTouchTap={this.handleCancel.bind(this)} />
            </div>
          </div>
        </form>
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages,
    countries: state.countries,
    cities: state.cities
  };
}

export default connect(mapStateToProps)(ParticipantForm);
