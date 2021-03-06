import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { saveToLocalStorage, loadFromLocalStorage } from '../../services/localStorage';
import './FeedbackScreen.css';
import Medal from '../../images/medal.svg';
import ScoreBoard from '../../components/ScoreBoard';
import Button from '../../components/button';
import Header from '../../components/header';

const messages = {
  goodAssertion: 'Mandou bem!',
  badAssertion: 'Podia ser melhor...',
};

const difficultyValues = {
  hard: 3,
  medium: 2,
  easy: 1,
}

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playAgain: false,
    };
  }

  componentDidMount() {
    const { name, score, picture } = this.props;
    const actualRanking = loadFromLocalStorage('ranking') ? loadFromLocalStorage('ranking') : [];

    actualRanking.push({ name, score, picture });
    saveToLocalStorage('ranking', actualRanking);
  }

  handleNewGame = () => {
    this.setState({ playAgain: true });
  };

  renderMessage = (assertions) => (
    <div>
      <div className="ranking-status">
        <img src={Medal} alt="In rank medal" className="animate__animated animate__bounceIn" />
        <h2 className="animate__animated animate__fadeIn">You are on TOP 5!</h2>
      </div>
      <h2 data-testid="feedback-text">{assertions >= 3 ? messages.goodAssertion : messages.badAssertion}</h2>
    </div>
  );

  render() {
    const { playAgain } = this.state;
    const { score, assertions, difficulty } = this.props;
    const maxScore = (difficulty) ? (10 + (30 * difficultyValues[difficulty])) * 5 : 350;

    if (playAgain) return <Redirect to="/" />;

    return (
      <div className="FeedbackScreen">
        {/* <Header /> */}
        {this.renderMessage(assertions)}
        <div className="final-result">
          <ScoreBoard title="Hits" maxValue="5" value={assertions} />
          <ScoreBoard title="Score" maxValue={maxScore} value={score} />
        </div>
        <Button
          isDisabled={false}
          data-testid="btn-go-home"
          onClick={() => this.handleNewGame()}
        >
          Jogar Novamente
        </Button>
        <Link to="/ranking">
          <Button isDisabled={false} data-testid="btn-ranking">
            Ver Raking
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userDataReducer.player.score,
  assertions: state.userDataReducer.player.assertions,
  difficulty: state.settingsReducer.settings.difficulty,
  name: state.userDataReducer.player.name,
  picture: state.userDataReducer.picture,
});

FeedbackScreen.propTypes = {
  score: Proptypes.number.isRequired,
  assertions: Proptypes.number.isRequired,
  name: Proptypes.string.isRequired,
  picture: Proptypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackScreen);
