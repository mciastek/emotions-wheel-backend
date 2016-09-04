import 'css/components/photos-selection.scss';

import React from 'react';
import classNames from 'classnames';

import { GridList, GridTile } from 'material-ui/lib/grid-list';
import Checkbox from 'material-ui/lib/checkbox';

import PhotoPreviewButton from 'containers/photo/PhotoPreviewButton';

const checkboxIconStyle = {
  fill: 'white'
}

class PhotosSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return;

    const { selected = [] } = nextProps;

    this.setState({
      selection: selected
    });
  }

  handleChange(photo, e, isChecked) {
    if (isChecked) {
      this.pushToSelection(photo, this.props.onChange);
    } else {
      this.removeFromSelection(photo.id, this.props.onChange);
    }
  }

  pushToSelection(photo, callback) {
    this.setState({
      selection: [
        ...this.state.selection,
        photo
      ]
    }, callback);
  }

  removeFromSelection(photoId, callback) {
    this.setState({
      selection: this.state.selection.filter((selected) => selected.id !== photoId)
    }, callback);
  }

  render() {
    const thumbs = this.props.collection.map((photo, index) => {
      const isChecked = !!this.state.selection.find(s => s.id === photo.id);

      const actions = (() => {
        return (
          <div className="photos-selection__actions">
            <PhotoPreviewButton photo={photo} />
            <div className="photos-selection__checkbox">
              <Checkbox iconStyle={checkboxIconStyle} onCheck={this.handleChange.bind(this, photo)} checked={isChecked} />
            </div>
          </div>
        );
      })();

      const className = classNames('photos-selection__item', {
        'is-active': isChecked
      });

      return (
        <GridTile key={index} className={className} title={photo.name} actionIcon={actions}>
          <img src={photo.thumb} alt={photo.name} />
        </GridTile>
      );
    });

    return (
      <section className="photos-selection">
        <header className="photos-selection__header">
          <h3 className="photos-selection__title">{this.props.title}</h3>
        </header>
        <GridList className="photos-selection__grid" cellHeight={200} cols={4}>
          {thumbs}
        </GridList>
      </section>
    );
  }
}

export default PhotosSelection;
