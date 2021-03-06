import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import { createParticipant, updateParticipant } from 'actions/participant';
import { showNotificationBar, setNotificationBarContent } from 'actions/ui';
import { createCity } from 'actions/cities';

import Input from 'components/Input';
import InputSearch from 'components/InputSearch';
import Select from 'components/Select';
import BirthdateField from 'components/BirthdateField';

import LinkButton from 'containers/common/LinkButton';

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

    const { id: pariticpantId } = this.props.participant;

    const {
      first_name,
      last_name,
      email,
      gender,
      birthdate,
      language,
      country,
      city
    } = this.refs;

    const cityName = city.state.value;

    const { id: city_id } = this.getCityByName(cityName) || {};

    const requestData = {
      first_name: first_name.state.value,
      last_name: last_name.state.value,
      email: email.state.value,
      gender: gender.state.value,
      birthdate: birthdate.state.value,
      language_id: language.state.value,
      country_id: country.state.value,
      city_id: city_id
    };

    if (!city_id) {
      this.newCity({
        name: cityName,
        country_id: country.state.value
      })
      .then(() => {
        const { id: city_id } = this.getCityByName(cityName);

        this.submitParticipant(pariticpantId, {
          ...requestData,
          city_id: city_id
        })
      });
    } else {
      this.submitParticipant(pariticpantId, requestData);
    }

  }

  newCity(params) {
    return this.props.dispatch(createCity(params));
  }

  submitParticipant(pariticpantId, requestData) {
    if (this.props.actionType === 'create') {
      this.newParticipant(requestData);
    } else {
      this.updateParticipant(pariticpantId, requestData);
    }
  }

  newParticipant(params) {
    this.props.dispatch(createParticipant(params))
      .then(() => {
        this.props.dispatch(push('/dashboard/participants'));

        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `New participant created!`
        }));
      });
  }

  updateParticipant(id, params) {
    this.props.dispatch(updateParticipant(id, params))
      .then(() => {
        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `Participant "${params.first_name} ${params.last_name}" updated!`
        }));
      });
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
              <Input ref="first_name" floatingLabelText="First Name" value={first_name} />
            </div>
            <div className="form-row__column--4">
              <Input ref="last_name" floatingLabelText="Last Name" value={last_name} />
            </div>
            <div className="form-row__column--4">
              <Input ref="email" floatingLabelText="Email" value={email} />
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
              <Input floatingLabelText="Age" value={age} disabled={true} />
            </div>
          </div>

          <div className="form-row--splitted">
            <div className="form-row__column--3">
              <Select ref="language" options={languageSelectOptions} value={language_id} floatingLabelText="Language" />
            </div>
            <div className="form-row__column--3">
              <Select ref="country" options={countrySelectOptions} value={country_id} floatingLabelText="Country" />
            </div>
            <div className="form-row__column--3">
              <InputSearch ref="city" dataSource={cityOptions} value={citySearchText} filterType="caseInsensitiveFilter" floatingLabelText="City" />
            </div>
          </div>

          <div className="form-row--splitted form-row--submit">
            <div className="form-row__column--4"></div>
            <div className="form-row__column--4">
              <RaisedButton type="submit" label="Save" secondary={true} fullWidth={true} />
            </div>
            <div className="form-row__column--4">
              <LinkButton label="Cancel" parimary={true} fullWidth={true} route="/dashboard/participants" />
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
