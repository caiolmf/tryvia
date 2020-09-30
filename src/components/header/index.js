import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

import { sendUrlGravatar } from '../../redux/actions';
import { getGravatar } from '../../services/api';

class Header extends Component {
  componentDidMount() {
    const { sendUrlGravatarProp, email } = this.props;

    if (!email) {
      window.location.replace('/');
    }

    const urlEmail = getGravatar(email);
    sendUrlGravatarProp(urlEmail);
  }

  render() {
    const {
      urlGravatar, name, score,
    } = this.props;

    return (
      <header>
        <img src={urlGravatar} alt="Foto Gravatar" data-testid="header-profile-picture" />
        <h3 data-testid="header-player-name">{name}</h3>
        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userDataReducer.player.gravatarEmail,
  name: state.userDataReducer.player.name,
  score: state.userDataReducer.player.score,
  urlGravatar: state.userDataReducer.picture,
});

const mapDispatchToProps = (dispatch) => ({
  sendUrlGravatarProp: (url) => dispatch(sendUrlGravatar(url)),
});

Header.propTypes = {
  sendUrlGravatarProp: Proptypes.func.isRequired,
  urlGravatar: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
  email: Proptypes.string.isRequired,
  score: Proptypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
