import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './ScoreBoard.css';
import './css-circular-prog-bar.css';

class ScoreBoard extends Component {
  componentDidMount() {
    this.handleAssertion();
  }

  handleAssertion = () => {
    const { questions, value } = this.props;
    const assertionRate = Math.round((value * 100) / questions);

    document.querySelector('.value-bar').style.transform = `rotate(${assertionRate * 3.6}deg)`;
    if (assertionRate > 50) document.querySelector('.progress-circle').classList.add('over50');
  };

  render() {
    const { title, maxValue, value } = this.props;

    return (
      <div className="ScoreBoard">
        <div data-testid="feedback-total-question" className="invisible">{value}</div>
        <section>
          <h2 className="title">{title}</h2>
          <div className="progress-circle">
            <span>{`${value}/${maxValue}`}</span>
            <div className="left-half-clipper">
              <div className="first50-bar" />
              <div className="value-bar" />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ScoreBoard.propTypes = {
  value: Proptypes.number.isRequired,
  maxValue: Proptypes.objectOf(Proptypes.string).isRequired,
};

export default ScoreBoard;
