import config from '../config';

import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';

import { fetchParticipant } from 'actions/participant';

import LinkButton from 'containers/LinkButton';

class ParticipantPreview extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchParticipant(this.props.params.id));
  }

  findItemById(collectionName, id) {
    return this.props[collectionName].collection.find((item) => item.id === id);
  }

  render() {
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      birthdate,
      age,
      language_id,
      country_id,
      city_id,
      experiment_uuid
    } = this.props.participant.single;

    const qrCodeButton = (() => {
      if (experiment_uuid) {
        return (
          <div className="page-header__right">
            <LinkButton label="See QR code" primary={true} route={`/dashboard/participants/${id}/qr-code`} />
          </div>
        );
      }
    })();

    const { name:language } = this.findItemById('languages', language_id) || {};
    const { name:country } = this.findItemById('countries', country_id) || {};
    const { name:city } = this.findItemById('cities', city_id) || {};

    return (
      <section className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">Participant's preview</h1>
          </div>

          {qrCodeButton}
        </header>

        <section className="page__content">
          <div>
            <Paper className="page-details">
              <p className="page-details__row">
                <strong className="page-details__label">First name:</strong>
                <span className="page-details__text">{first_name}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Last name:</strong>
                <span className="page-details__text">{last_name}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Email:</strong>
                <span className="page-details__text">{email}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Gender:</strong>
                <span className="page-details__text">{gender}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Birthdate</strong>
                <span className="page-details__text">{moment(birthdate).format(config.date.format)}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Age</strong>
                <span className="page-details__text">{age}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Language</strong>
                <span className="page-details__text">{language}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">Country</strong>
                <span className="page-details__text">{country}</span>
              </p>

              <p className="page-details__row">
                <strong className="page-details__label">City</strong>
                <span className="page-details__text">{city}</span>
              </p>
            </Paper>

            <div className="page-actions">
              <div className="page-actions__row">
                <div className="page-actions__column--right">
                  <LinkButton label="Back" parimary={true} fullWidth={true} route="/dashboard/participants" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    participant: state.participant,
    languages: state.languages,
    cities: state.cities,
    countries: state.countries
  };
}

export default connect(mapStateToProps)(ParticipantPreview);
