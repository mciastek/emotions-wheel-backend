import 'css/components/datetime-field.scss';

import React from 'react';

import InputDate from 'components/InputDate';
import InputTime from 'components/InputTime';

class DateTimeField extends React.Component {
  render() {
    return (
      <div className="datetime-field">
        <div className="datetime-field__col">
          <InputTime hintText={this.props.timeLabel} />
        </div>
        <div className="datetime-field__col">
          <InputDate hintText={this.props.dateLabel} />
        </div>
      </div>
    );
  }
}

export default DateTimeField;
