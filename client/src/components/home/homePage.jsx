import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <h1> Dockman </h1>
        <p>React Redux</p>
        <Link to="about"> Learn More </Link>
      </div>

    );
  }
}
export default HomePage;
