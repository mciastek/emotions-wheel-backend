import React from 'react';

import LoginForm from 'containers/LoginForm';

class LoginView extends React.Component {
  render() {
    return (
      <div className="container--content-centered">
        <LoginForm />
      </div>
    );
  }
}

export default LoginView;
