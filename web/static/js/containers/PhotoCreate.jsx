import React from 'react';
import { connect } from 'react-redux';

import RaisedButton from 'material-ui/lib/raised-button';

import Input from 'components/Input';

import LinkButton from 'containers/LinkButton';

import { createPhoto } from 'actions/photo';

class PhotoCreate extends React.Component {
  handleSubmit(e) {
    e.preventDefault();

    const {
      name,
      url
    } = this.refs;

    const requestData = {
      name: name.state.value,
      url: url.files[0]
    };

    const formData = this.buildFormData(requestData);

    this.props.dispatch(createPhoto(formData));
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
              <div className="form-row__column--12">
                <Input ref="name" floatingLabelText="Photo's name" />
              </div>
            </div>

            <div className="form-row--splitted">
              <div className="form-row__column--12">
                <input type="file" ref="url" />
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
