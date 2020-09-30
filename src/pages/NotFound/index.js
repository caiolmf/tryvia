import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div className="trivia-screen">
        PAGE NOT FOUND
        <Link to="/">
          Back to start
        </Link>
      </div>
    );
  }
}
export default NotFound;
