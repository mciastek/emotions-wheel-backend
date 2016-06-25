import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';

import QRCode from 'qrcode.react';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionPrint from 'material-ui/lib/svg-icons/action/print';

import { fetchParticipant } from 'actions/participant';

import Printable from 'components/Printable';

const actionButtonStyle = {
  position: 'fixed',
  bottom: 30,
  right: 30
};

class QrCodePrint extends React.Component {
  componentDidMount() {
    const { id } = this.props.participant.single;

    if (id !== this.props.params.id) {
      this.props.dispatch(fetchParticipant(this.props.params.id));
    }
  }

  handlePrintClick() {
    window.print();
  }

  render() {
    const { first_name, last_name } = this.props.participant.single;

    return (
      <div className="page">
        <header className="page-header">
          <div className="page-header__left">
            <h1 className="page__title">QR code for {first_name} {last_name}</h1>
          </div>

          <div className="page-header__right">
            <RaisedButton label="Go back" primary={true} onTouchTap={() => this.props.dispatch(goBack())} />
          </div>
        </header>

        <section className="page__content">
          <Printable>
            <header>
              <h1>Hi {first_name} {last_name}</h1>
            </header>

            <article>
              <h2>Lorem ipsum dolor</h2>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur aperiam rerum, consequatur sequi culpa sapiente incidunt architecto magnam reiciendis, ab consectetur eveniet nulla hic delectus voluptatum. Facere, nulla quasi modi.
                Modi corporis, voluptatum in commodi excepturi possimus cumque beatae aspernatur quas inventore sit ad ea quasi labore cum quo et fugiat. Officiis, tempore explicabo odio labore amet est error a!
                Error dolore vel voluptates autem iure magnam ipsa dolorem neque deserunt dolor asperiores fugiat consequuntur officiis, tempore quia, consectetur provident blanditiis. Laboriosam commodi, nisi odio rerum cupiditate, doloribus facere labore.
              </p>

              <QRCode value={this.props.participant.single.experiment_uuid || ''} />

              <p>
                Dolore at architecto, saepe modi voluptatem neque vitae, quia animi repellat, voluptates similique illo fugiat? Numquam dignissimos, unde odio ut vero officiis autem, quisquam! Illo architecto debitis, distinctio et incidunt!
                Aliquid totam quos perspiciatis nam eligendi placeat, nostrum sunt ad pariatur tenetur vero sequi dolore dignissimos ut aspernatur nihil iste voluptatem fugit officiis repudiandae temporibus dolorum aut praesentium facilis. Nihil!
              </p>
            </article>
          </Printable>

          <FloatingActionButton className="print-button" style={actionButtonStyle} onTouchTap={this.handlePrintClick.bind(this)}>
            <ActionPrint />
          </FloatingActionButton>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    participant: state.participant
  };
}

export default connect(mapStateToProps)(QrCodePrint);
