import 'css/containers/login-form.scss';

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';

import Storage from 'utils/Storage';

import { signIn, fetchCurrentUser } from 'actions/session';

import Input from 'components/Input';
import FlashMessage from 'components/FlashMessage';

const inputStyles = {
  marginTop: 0
};

class LoginForm extends React.Component {
  componentDidMount() {
    const {token} = Storage.getItem('authenticated') || {};

    if (token) {
      this.props.dispatch(fetchCurrentUser());
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    const hasCurrentUser = this.props.session.currentUser !== null;

    if (hasCurrentUser) {
      this._redirectToDashboard();
    } else {
      this._submitSignIn();
    }
  }

  _submitSignIn() {
    const email = this.refs.email.state.value;
    const password = this.refs.password.state.value;

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

  _redirectToDashboard() {
    this.props.dispatch(push('/dashboard'));
  }

  render() {
    const errorMessage = (() => {
      if (this.props.session.error) {
        return (
          <FlashMessage type="error" message={this.props.session.error.message} />
        );
      }
    })();

    const hasCurrentUser = this.props.session.currentUser !== null;
    const { email, password } = this.props.session.currentUser || {};

    const passwordField = (() => {
      if (!hasCurrentUser) {
        return (
          <div className="form-row">
            <Input type="password" ref="password" hintText="Password" value={password} fullWidth={true} inputStyle={inputStyles} />
          </div>
        );
      }
    })();

    const buttonLabel = (hasCurrentUser) ? 'Go to dashboard' : 'Submit';

    return (
      <section className="login-form">
        <header className="login-form__header">
          <h1 className="login-form__title">Welcome back</h1>
          <h3 className="login-form__subtitle">Please log in</h3>
        </header>

        {errorMessage}

        <Paper className="login-form__content">
          <form onSubmit={this.handleSubmit.bind(this)} noValidate>
            <div className="form-row">
              <Input ref="email" hintText="E-mail" fullWidth={true} value={email} inputStyle={inputStyles} disabled={hasCurrentUser} />
            </div>

            {passwordField}

            <div className="form-row">
              <RaisedButton type="submit" label={buttonLabel} secondary={true} fullWidth={true} />
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
