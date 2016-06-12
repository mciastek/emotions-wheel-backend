import 'css/components/printable.scss';

import React from 'react';

class Printable extends React.Component {
  render() {
    return (
      <section className="printable">
        {this.props.children}
      </section>
    );
  }
}

export default Printable;
