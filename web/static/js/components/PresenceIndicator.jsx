import 'css/components/presence-indicator.scss';

import React, { PropTypes } from 'react';
import classNames from 'classnames';

class PresenceIndicator extends React.Component {
  render() {
    const { online } = this.props;
    const className = classNames('presence-indicator', {
      'is-online': online
    });

    return (
      <small className={className}>{(online) ? 'online' : 'offline'}</small>
    );
  }
}

PresenceIndicator.propTypes = {
  online: PropTypes.bool
};

export default PresenceIndicator;
