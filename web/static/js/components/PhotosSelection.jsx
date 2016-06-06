import 'css/components/photos-selection.scss';

import React from 'react';
import classNames from 'classnames';

import { GridList, GridTile } from 'material-ui/lib/grid-list';
import Checkbox from 'material-ui/lib/checkbox';

import PhotoPreviewButton from 'containers/PhotoPreviewButton';

const checkboxIconStyle = {
  fill: 'white'
}

class PhotosSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: [],
      photos: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps) return;

    const { selected = [] } = nextProps;

    if (selected.length) {
      this.setState({
        selection: this.mappedToProp(selected)
      });
    }
  }

  handleChange(photo, e, isChecked) {
    if (isChecked) {
      this.pushToSelection(photo[this.props.selectBy]);
    } else {
      this.removeFromSelection(photo[this.props.selectBy]);
    }
  }

  pushToSelection(prop) {
    this.setState({
      selection: [
        ...this.state.selection,
        prop
      ]
    });
  }

  removeFromSelection(prop) {
    this.setState({
      selection: this.state.selection.filter((selected) => selected !== prop)
    });
  }

  mappedToProp(collection) {
    return collection.map((item) => item[this.props.selectBy]);
  }

  render() {
    const thumbs = this.props.collection.map((photo, index) => {
      const isChecked = this.state.selection.indexOf(photo[this.props.selectBy]) !== -1;

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
        <GridTile key={index} className={className} title={photo.name} actionIcon={actions} >
          <img src={photo.url} alt={photo.name} />
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
