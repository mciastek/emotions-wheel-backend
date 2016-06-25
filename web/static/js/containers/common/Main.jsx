import 'normalize.css';
import 'css/app.scss';

import React from 'react';

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        {this.props.children}
      </main>
    );
  }
}

export default Main;
