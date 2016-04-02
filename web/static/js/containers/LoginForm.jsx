import 'css/containers/login-form.scss';

import React from 'react';

import Connection from 'utils/Connection';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const inputStyles = {
  marginTop: 0
};

class LoginForm extends React.Component {

  handleSubmit() {

  }

  render() {
    return (
      <section className="login-form">
        <header className="login-form__header">
          <h1 className="login-form__title">Welcome back</h1>
          <h3 className="login-form__subtitle">Please log in</h3>
        </header>

        <Paper className="login-form__content">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <TextField hintText="Login" fullWidth={true} inputStyle={inputStyles} />
            </div>

            <div className="form-row">
              <TextField hintText="Password" type="password" fullWidth={true} inputStyle={inputStyles} />
            </div>

            <div className="form-row">
              <RaisedButton label="Submit" secondary={true} fullWidth={true} />
            </div>
          </form>
        </Paper>
      </section>
    );
  }
}

export default LoginForm;
