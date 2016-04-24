import React from 'react';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

class InputTime extends React.Component {
  render() {
    return (
      <TimePicker {...this.props} format="24hr" />
    );
  }
}

export default InputTime;
