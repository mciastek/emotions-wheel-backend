import 'css/components/flash-message.scss';

import React, { PropTypes } from 'react';
import classNames from 'classnames';

class FlashMessage extends React.Component {
  render() {

    const className = classNames({
      'flash-message--success': this.props.type === 'success',
      'flash-message--error': this.props.type === 'error',
      'flash-message--warning': this.props.type === 'warning'
    });

    return (
      <div className={className}>
        <p className="flash-message__content">{this.props.message}</p>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string
};

FlashMessage.defaultProps = {
  type: 'success'
};

export default FlashMessage;
