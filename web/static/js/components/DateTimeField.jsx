import 'css/components/datetime-field.scss';

import React from 'react';
import moment from 'moment';

import InputDate from 'components/InputDate';
import InputTime from 'components/InputTime';

class DateTimeField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: moment().format('H:mm:ss'),
      date: moment().format('YYYY-MM-DD')
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return;

    const { value } = nextProps;
    const date = moment(nextProps.value).format('YYYY-MM-DD');
    const time = moment(nextProps.value).format('H:mm:ss');

    this.setState({
      date,
      time,
      value
    });
  }

  updateTime(_, value) {
    const time = moment(value).format('H:mm:ss');

    this.setState({ time });

    this._updateValue({ time });
  }

  updateDate(_, value) {
    const date = moment(value).format('YYYY-MM-DD');

    this.setState({ date });

    this._updateValue({ date });
  }

  _updateValue(value) {
    const { date, time } = {
      ...this.state,
      ...value
    };

    this.setState({
      value: `${date} ${time}`
    });
  }

  render() {
    const convertedDate = (this.state.value) ? moment(this.state.value).toDate() : null;

    return (
      <div className="datetime-field">
        <div className="datetime-field__col">
          <InputTime value={convertedDate} hintText={this.props.timeLabel} onChange={this.updateTime.bind(this)} />
        </div>
        <div className="datetime-field__col">
          <InputDate value={convertedDate} hintText={this.props.dateLabel} onChange={this.updateDate.bind(this)} />
        </div>
      </div>
    );
  }
}

export default DateTimeField;
