import 'css/containers/login-form.scss';

import React from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import { signIn } from 'actions/session';

import FlashMessage from 'components/FlashMessage';

const inputStyles = {
  marginTop: 0
};

class LoginForm extends React.Component {

  handleSubmit(e) {
    e.preventDefault();

    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();

    if (!email) {
      this.refs.email.setState({
        errorText: 'That field can\'t be blank!'
      });
    }

    if (!password) {
      this.refs.password.setState({
        errorText: 'That field can\'t be blank!'
      });
    }

    if (email && password) {
      this.props.dispatch(signIn(email, password));
    }
  }

  render() {

    const errorMessage = (() => {
      if (this.props.session.error.message) {
        return (
          <FlashMessage type="error" message={this.props.session.error.message} />
        );
      }
    })();

    return (
      <section className="login-form">
        <header className="login-form__header">
          <h1 className="login-form__title">Welcome back</h1>
          <h3 className="login-form__subtitle">Please log in</h3>
        </header>

        {errorMessage}

        <Paper className="login-form__content">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-row">
              <TextField ref="email" hintText="E-mail" fullWidth={true} inputStyle={inputStyles} />
            </div>

            <div className="form-row">
              <TextField ref="password" hintText="Password" type="password" fullWidth={true} inputStyle={inputStyles} />
            </div>

            <div className="form-row">
              <RaisedButton type="submit" label="Submit" secondary={true} fullWidth={true} />
            </div>
          </form>
        </Paper>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(LoginForm);
