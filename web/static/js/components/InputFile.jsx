import 'css/components/input-file.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import FloatingActionButton from 'material-ui/lib/floating-action-button';
import FileFileUpload from 'material-ui/lib/svg-icons/file/file-upload';

class InputFile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: {}
    };
  }

  openFileDialog() {
    ReactDOM.findDOMNode(this.refs.fileInput).click();
  }

  handleChange(e) {
    this.setState({
      file: e.target.files[0]
    });

    if (this.props.onChange) {
      this.props.onChange(e.target.files[0]);
    }
  }

  render() {
    const className = classNames('input-file', this.props.className);

    return (
      <div className={className}>
        <FloatingActionButton className="input-file__trigger" zDepth={0} mini={true} onTouchTap={this.openFileDialog.bind(this)}>
          <FileFileUpload />
        </FloatingActionButton>
        <input type="file" ref="fileInput" className="input-file__input" onChange={this.handleChange.bind(this)} />
        <div className="input-file__label">
          {this.state.file.name || 'Upload file'}
        </div>
      </div>
    );
  }
}

export default InputFile;
