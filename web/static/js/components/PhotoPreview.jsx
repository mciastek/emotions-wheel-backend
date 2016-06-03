import 'css/components/photo-preview.scss';

import React from 'react';
import { Promise } from 'es6-promise';

import * as Colors from 'material-ui/lib/styles/colors';
import EditorInsertPhoto from 'material-ui/lib/svg-icons/editor/insert-photo';

import InputFile from 'components/InputFile';

const previewIconStyle = {
  width: 120,
  height: 120
};

class PhotoPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      file: null
    };
  }

  handleFileChange(file) {
    this.readFile(file)
      .then((photo) => {
        this.setState({ photo, file });
      });
  }

  readFile(file) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        resolve(e.target.result);
      };

      reader.onerror = (reason) => {
        reject(reason);
      };

      reader.readAsDataURL(file);
    });
  }

  render() {
    const previewStyles = (this.state.photo) ? {
      backgroundImage: `url(${this.state.photo})`
    } : null;

    return (
      <div className="photo-preview">
        <div className="photo-preview__image" style={previewStyles}>
          {(this.state.photo) ? null : <EditorInsertPhoto className="photo-preview__icon" style={previewIconStyle} color={Colors.grey500} />}
        </div>
        <div className="photo-preview__caption">
          <InputFile className="photo-preview__input" onChange={this.handleFileChange.bind(this)} />
        </div>
      </div>
    );
  }
}

export default PhotoPreview;
