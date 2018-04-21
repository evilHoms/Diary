import React from 'react';
import './Loader.scss';

export default class Loader extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="loader">
        Loading...
      </div>
    );
  }
}