import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

class InputDate extends React.Component {
  render() {
    return (
      <DatePicker {...this.props} mode="landscape" firstDayOfWeek={1} />
    );
  }
}

export default InputDate;
