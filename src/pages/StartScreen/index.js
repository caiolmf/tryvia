import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { fetchToken } from '../../redux/actions/actionToken';
import { sendUserData } from '../../redux/actions';
import { saveToLocalStorage } from '../../services/localStorage';
import '../../App.css';
import Button from '../../components/button';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { goPlay: false, isDisabled: true };
  }

  componentDidMount() {
    const { fetchTokenProp } = this.props;

    fetchTokenProp();
  }

  handleUser = (gravatarEmail, name) => {
    const { sendUserDataProp } = this.props;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail,
      },
    };
    sendUserDataProp(player.player);
    saveToLocalStorage('state', { ...player });
  };

  handleInput = (type, event) => {
    const { value } = event.target;
    const { sendUserDataProp, name, gravatarEmail } = this.props;

    if (name && gravatarEmail) {
      this.setState({ isDisabled: false });
    }
    if (type === 'email') {
      return sendUserDataProp({ gravatarEmail: value });
    }
    return sendUserDataProp({ name: value });
  };

  playTrivia = (e) => {
    e.preventDefault();
    const { name, gravatarEmail, fetchTokenProp } = this.props;

    this.handleUser(gravatarEmail, name);
    this.setState({ goPlay: true });
    fetchTokenProp();
    return console.log('oops');
  };

  renderFieldsetInputs = () => (
    <fieldset className="fieldset-inputs-start-screen">
      <label htmlFor="input-gravatar-email">{`Gravatar's Email:`}</label>
      <input
        type="email"
        data-testid="input-gravatar-email"
        id="input-gravatar-email"
        placeholder="<name@email.com>"
        onChange={(e) => this.handleInput('email', e)}
        required
      />
      <label htmlFor="input-player-name">{`Player's Name:`}</label>
      <input
        type="text"
        data-testid="input-player-name"
        id="input-player-name"
        placeholder="<player name>"
        onChange={(e) => this.handleInput('name', e)}
        required
      />
    </fieldset>
  );

  renderFieldsetButtons = () => (
    <fieldset className="fieldset-buttons-start-screen">
      <Link to="/settings">
        <label htmlFor="btn-settings">
          <Button
            type="button"
            data-testid="btn-settings"
            className="btn-settings"
            id="btn-settings"
          >
            Settings
          </Button>
        </label>
      </Link>
      <label htmlFor="btn-play">
        <Button
          isDisabled={this.state.isDisabled}
          type="submit"
          data-testid="btn-play"
          className="btn-play"
          id="btn-play"
          onClick={(e) => this.playTrivia(e)}
        >
          Play!
        </Button>
      </label>
    </fieldset>
  );

  render() {
    const { goPlay } = this.state;
    if (goPlay) {
      return <Redirect to="/trivia" />;
    }
    return (
      <div className="trivia-screen">
        <form className="form-start-screen">
          {this.renderFieldsetInputs()}
          {this.renderFieldsetButtons()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokenProp: () => dispatch(fetchToken()),
  sendUserDataProp: (userData) => dispatch(sendUserData(userData)),
});

const mapStateToProps = (state) => ({
  isFetching: state.tokenReducer.isFetching,
  gravatarEmail: state.userDataReducer.player.gravatarEmail,
  name: state.userDataReducer.player.name,
});

StartScreen.propTypes = {
  fetchTokenProp: Proptypes.func.isRequired,
  sendUserDataProp: Proptypes.func.isRequired,
  gravatarEmail: Proptypes.string.isRequired,
  name: Proptypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
