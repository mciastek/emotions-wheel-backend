import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import Input from 'components/Input';
import PhotoPreview from 'components/PhotoPreview';

import LinkButton from 'containers/common/LinkButton';

import { createPhoto } from 'actions/photo';
import { showNotificationBar, setNotificationBarContent } from 'actions/ui';

class PhotoCreate extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      file
    } = this.refs;

    const params = {
      name: name.state.value,
      file: file.state.file,
      author_type: 'researcher',
      author_id: this.props.session.currentUser.id
    };

    const formData = this.buildFormData(params);

    this.createPhoto(formData);
  }

  createPhoto(data) {
    this.props.dispatch(createPhoto(data))
      .then(() => {
        this.props.dispatch(push('/dashboard/photos'));

        this.props.dispatch(showNotificationBar());

        this.props.dispatch(setNotificationBarContent({
          message: `Photo uploaded!`
        }));
      });
  }

  buildFormData(params) {
    const data = new FormData();

    for (let prop in params) {
      data.append(`photo[${prop}]`, params[prop]);
    }

    return data;
  }

  render() {
    return (
      <section className="page">
        <header className="page-header">
          <h1 className="page__title">Add new Photo</h1>
        </header>
        <section className="page__content">
          <form className="form" onSubmit={this.handleSubmit.bind(this)} noValidate>

            <div className="form-row--splitted">
              <div className="form-row__column--3">
                <PhotoPreview ref="file" />
              </div>
              <div className="form-row__column--6">
                <Input ref="name" floatingLabelText="Photo's name" />
              </div>
            </div>

            <div className="form-row--splitted form-row--submit">
              <div className="form-row__column--4"></div>
              <div className="form-row__column--4">
                <RaisedButton type="submit" label="Save" secondary={true} fullWidth={true} />
              </div>
              <div className="form-row__column--4">
                <LinkButton label="Cancel" parimary={true} fullWidth={true} route="/dashboard/photos" />
              </div>
            </div>
          </form>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  };
}

export default connect(mapStateToProps)(PhotoCreate);
