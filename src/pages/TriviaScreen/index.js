import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { fetchQuestions } from '../../redux/actions/actionQuest';
import { saveToLocalStorage } from '../../services/localStorage';
import { setScore } from '../../redux/actions';
import '../../App.css';
import Header from '../../components/header';
import Button from '../../components/button';

class TriviaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      isDisabled: true,
      quizEnd: false,
      shuffledAnswers: undefined,
      timer: 30,
    };
  }

  componentDidMount() {
    const { fetchQuestionsProp, settings } = this.props;

    fetchQuestionsProp(settings);
    this.handleTimer();
  }

  setIntervalId = '';

  handleTimer = () => {
    this.setIntervalId = setInterval(() => {
      const { timer } = this.state;
      this.setState(
        {
          timer: timer - 1,
        },
        () => {
          if (timer === 1) {
            clearInterval(this.setIntervalId);
            this.setState({ isDisabled: false });
            document.querySelectorAll('.answer').forEach((answer) => {
              const button = answer;
              button.disabled = true;
            });
          }
        },
      );
    }, 1000);
  };

  finishHandler = () => this.setState({ quizEnd: true });

  nextQuestionHandler = (e) => {
    e.preventDefault();
    const { currentIndex } = this.state;
    const { data } = this.props;

    if (currentIndex === data.length - 1) return this.finishHandler();

    return this.setState(
      {
        shuffledAnswers: undefined,
        currentIndex: currentIndex + 1,
        timer: 30,
        isDisabled: true,
      },
      () => this.handleTimer(),
    );
  };

  scoreService = (time, difficulty) => {
    const {
      player, score, assertions, setUserScore,
    } = this.props;
    console.log(player);

    const difficulties = {
      hard: 3,
      medium: 2,
      easy: 1,
    };

    const userScore = {
      score: score + (10 + (time * difficulties[difficulty])),
      assertions: assertions + 1,
    };

    setUserScore(userScore);
    saveToLocalStorage('state', { player: { ...player, ...userScore } });
  };

  checkAnswer = (choice) => {
    const { data } = this.props;
    const { currentIndex, timer } = this.state;
    document.querySelector('.correct-answer').classList.add('green-border');
    document
      .querySelectorAll('.wrong-answer')
      .forEach((answer) => answer.classList.add('red-border'));
    document.querySelectorAll('.answer').forEach((answer) => {
      const button = answer;
      button.disabled = true;
    });

    clearInterval(this.setIntervalId);

    this.setState({ isDisabled: false });

    if (choice === data[currentIndex].correct_answer) {
      this.scoreService(timer, data[currentIndex].difficulty);
    }
  };

  shuffle = (array) => {
    const originalArray = array;
    let currentIndex = array.length;
    let temporaryValue = '';
    let randomIndex = 0;

    //  While there remain elements to shuffle...
    while (currentIndex !== 0) {
      //  Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      //  And swap it with the current element.
      //  Valor temporário recebe valor do index atual do array
      temporaryValue = originalArray[currentIndex];
      //  Valor atual recebe valor aleatório da array
      originalArray[currentIndex] = originalArray[randomIndex];
      // Valor aleatorio recebe valor atual
      originalArray[randomIndex] = temporaryValue;
    }

    this.setState({
      shuffledAnswers: originalArray,
    });

    return originalArray;
  };

  optionsAnswers = (data) => {
    const { currentIndex, shuffledAnswers, isDisabled } = this.state;
    const correctAnswer = data[currentIndex].correct_answer;
    const incorrectAnswers = data[currentIndex].incorrect_answers;
    const answers = [correctAnswer, ...incorrectAnswers];

    const arrayNew = shuffledAnswers || this.shuffle(answers);

    const setButton = arrayNew.map((answer) => (
      <Button
        isDisabled={!isDisabled}
        key={answer}
        type="button"
        onClick={() => this.checkAnswer(answer)}
        data-testid={answer === correctAnswer ? 'correct-answer' : 'wrong-answer'}
        className={`answer ${answer === correctAnswer ? 'correct-answer' : 'wrong-answer'}`}
      >
        {answer}
      </Button>
    ));

    return <div className="answers">{setButton}</div>;
  };

  render() {
    const {
      quizEnd, isDisabled, currentIndex, timer,
    } = this.state;
    const { data, isFetchingToken, isFetchingQuestion } = this.props;

    if (isFetchingToken || isFetchingQuestion) return <Header />;
    if (quizEnd) return <Redirect to="/feedback" />;

    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="question-category">{data[currentIndex].category}</h3>
          <h3 data-testid="question-text">{data[currentIndex].question.split('&quot;').join('"')}</h3>
          <span>{`Timer: ${timer}`}</span>
          <span>{`Difficulty: ${data[currentIndex].difficulty}`}</span>
          <span>{`Question ${currentIndex + 1} of ${data.length}`}</span>
        </div>
        <div>{this.optionsAnswers(data)}</div>
        {!isDisabled && (
          <Button
            isDisabled={isDisabled}
            type="button"
            data-testid="btn-next"
            onClick={(e) => this.nextQuestionHandler(e)}
          >
            Next Question
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.questionsReducer.questions,
  isFetchingToken: state.tokenReducer.isFetchingToken,
  isFetchingQuestion: state.questionsReducer.isFetchingQuestion,
  score: state.userDataReducer.player.score,
  assertions: state.userDataReducer.player.assertions,
  player: state.userDataReducer.player,
  settings: state.settingsReducer.settings,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: (settings) => dispatch(fetchQuestions(settings)),
  setUserScore: (data) => dispatch(setScore(data)),
});

TriviaScreen.propTypes = {
  fetchQuestionsProp: Proptypes.func.isRequired,
  data: Proptypes.objectOf(Proptypes.string).isRequired,
  isFetchingToken: Proptypes.func.isRequired,
  isFetchingQuestion: Proptypes.func.isRequired,
  setUserScore: Proptypes.func.isRequired,
  score: Proptypes.number.isRequired,
  assertions: Proptypes.number.isRequired,
  player: Proptypes.objectOf(Proptypes.string).isRequired,
  settings: Proptypes.objectOf(Proptypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaScreen);
