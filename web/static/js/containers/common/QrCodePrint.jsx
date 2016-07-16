import React from 'react';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import isEmpty from 'lodash/lang/isEmpty';

import QRCode from 'qrcode.react';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ActionPrint from 'material-ui/lib/svg-icons/action/print';

import Translation, { rep } from 'utils/Translation';

import { fetchParticipant } from 'actions/participant';

import Printable from 'components/Printable';

const actionButtonStyle = {
  position: 'fixed',
  bottom: 30,
  right: 30
};

class QrCodePrint extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translations: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.participant.single;

    if (id !== this.props.params.id) {
      this.props.dispatch(fetchParticipant(this.props.params.id));
    }
  }

  shouldComponentUpdate(_, nextState) {
    return !isEmpty(nextState.translations);
  }

  componentWillReceiveProps({ participant, languages }) {
    if (!isEmpty(participant.single) && !isEmpty(languages.collection)) {
      this.fetchTranslations(participant.single, languages.collection);
    }
  }

  getLanguage(languages, id) {
    return languages.find((language) => language.id === id);
  }

  fetchTranslations(participant, languages) {
    const languageId = participant.language_id;
    const { code } = this.getLanguage(languages, languageId);

    if (code) {
      Translation.changeLanguage(code)
        .then((translations) => {
          this.setState({ translations });
        });
    }
  }

  handlePrintClick() {
    window.print();
  }

  render() {
    const { first_name, last_name } = this.props.participant.single;
    const full_name = `${first_name} ${last_name}`;

    return (
      <section className="page">
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
              <h1>{rep(Translation.getTranslations('QrCodePrint').welcome, { full_name })}</h1>
            </header>

            <article>
              <h2>{Translation.getTranslations('QrCodePrint').subheading}</h2>

              <p>
                {Translation.getTranslations('QrCodePrint').first_paragraph}
              </p>

              <QRCode value={this.props.participant.single.experiment_uuid || ''} />

              <p>
                {Translation.getTranslations('QrCodePrint').second_paragraph}
              </p>
            </article>
          </Printable>

          <FloatingActionButton className="print-button" style={actionButtonStyle} onTouchTap={this.handlePrintClick.bind(this)}>
            <ActionPrint />
          </FloatingActionButton>
        </section>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    languages: state.languages,
    participant: state.participant
  };
}

export default connect(mapStateToProps)(QrCodePrint);
