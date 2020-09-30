import React, { Component } from 'react';
import Proptypes from 'prop-types';
import './ScoreBoard.css';
import './css-circular-prog-bar.css';

class ScoreBoard extends Component {
  componentDidMount() {
    this.handleAnimation();
  }

  handleAnimation = () => {
    const { title, maxValue, value } = this.props;
    const maxRate = Math.round(((value * 100) / maxValue) * 3.6); // degrees
    const halfCircleEndTimer = 150 / (maxRate / 2000) + 100;

    if (maxRate > 150) {
      setTimeout(() => {
        document.getElementById(`${title}-progress-bar`).classList.add('over50');
      }, halfCircleEndTimer);
    }

    document.getElementById(`${title}-value-bar`).animate(
      [
        // keyframes
        { transform: 'rotate(0deg)' },
        { transform: `rotate(${maxRate}deg)` },
      ],
      {
        // timing options
        duration: 2000,
        easing: 'ease-in-out',
        fill: 'forwards',
      },
    );

    // document.querySelector('.value-bar').style.transform = `rotate(${maxRate * 3.6}deg)`;
    // if (maxRate > 50) document.querySelector('.progress-circle').classList.add('over50');
  };

  render() {
    const { title, maxValue, value } = this.props;

    return (
      <div className="ScoreBoard">
        <div data-testid="feedback-total-question" className="invisible">
          {value}
        </div>
        <section>
          <h2 className="title">{title}</h2>
          <div id={`${title}-progress-bar`} className="progress-circle">
            <span>{`${value}/${maxValue}`}</span>
            <div className="left-half-clipper">
              <div className="first50-bar" />
              <div id={`${title}-value-bar`} className="value-bar" />
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
