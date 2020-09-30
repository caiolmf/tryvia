import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadFromLocalStorage } from '../../services/localStorage';
import Button from '../../components/button';

class Ranking extends Component {
  renderRanking = () => {
    const ranking = loadFromLocalStorage('ranking');
    const rankingSort = ranking.sort((a, b) => ((a.score < b.score) ? 1 : -1));

    return rankingSort.map((player, index) => (
      <li>
        <img src={player.picture} alt={player.name} />
        <p data-testid={`player-name-${index}`}>{player.name}</p>
        <p data-testid={`player-score-${index}`}>{player.score}</p>
      </li>
    ));
  };

  render() {
    return (
      <div className="ranking-screen">
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {this.renderRanking()}
        </ol>
        <Link to="/">
          <Button type="button" data-testid="btn-go-home">
            Back to home
          </Button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
