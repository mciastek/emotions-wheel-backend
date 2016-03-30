import React from 'react';

import Connection from 'utils/Connection';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="container">
        <form>
          <div>
            <TextField floatingLabelText="Login" />
          </div>

          <div>
            <TextField floatingLabelText="Password" type="password" />
          </div>

          <div>
            <RaisedButton label="Submit" secondary={true} />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
