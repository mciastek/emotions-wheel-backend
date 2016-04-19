import 'css/components/birthdate-field.scss';

import React from 'react';
import moment from 'moment';

import dateFixtures from 'constants/date-fixtures';

import Select from 'components/Select';

const days = dateFixtures.days.map((day) => {
  return {
    label: day,
    value: day
  };
});

const months = dateFixtures.months.map((month, index) => {
  return {
    label: month,
    value: index
  };
});

const years = dateFixtures.years.map((year) => {
  return {
    label: year,
    value: year
  };
});

class BirthdateField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      day: 1,
      month: 0,
      year: 1900
    };
  }

  componentWillReceiveProps(nextProps) {
    const { day, month, year } = this._getSplittedDate(nextProps.value);
    const UTCDate = this._convertToUTC({ d: day, M: month, y: year });

    this.setState({
      day,
      month,
      year,
      value: UTCDate
   });
  }

  updateDay(e, i, value) {
    this.setState({
      day: value
    });

    this._updateValue({day: value})
  }

  updateMonth(e, i, value) {
    this.setState({
      month: value
    });

    this._updateValue({month: value})
  }

  updateYear(e, i, value) {
    this.setState({
      year: value
    });

    this._updateValue({year: value})
  }

  _updateValue(value) {
    const { day:d, month:M, year:y } = {
      ...this.state,
      ...value
    };

    this.setState({
      value: this._convertToUTC({ d, M, y })
    });
  }

  _convertToUTC({ d, M, y }) {
    return moment({ d, M, y }).format();
  }

  _getSplittedDate(value) {
    const date = moment(value);

    return {
      day: date.date(),
      month: date.month(),
      year: date.year()
    };
  }

  render() {
    return(
      <div className="birthdate-field">
        <div className="birthdate-field__col">
          <Select options={days} floatingLabelText="Day" maxHeight={300} value={this.state.day} onChange={this.updateDay.bind(this)} />
        </div>
        <div className="birthdate-field__col">
          <Select options={months} floatingLabelText="Month" maxHeight={300} value={this.state.month} onChange={this.updateMonth.bind(this)} />
        </div>
        <div className="birthdate-field__col">
          <Select options={years} floatingLabelText="Year" maxHeight={300} value={this.state.year} onChange={this.updateYear.bind(this)} />
        </div>
      </div>
    );
  }
}

export default BirthdateField;
