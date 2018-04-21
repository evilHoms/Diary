import React from 'react';
import { connect } from 'react-redux';
import './MainScreen.scss';
import { toAuthForm } from '../../actions/actions';

const mapDispatchToProps = dispatch => {
  return {
    toAuth: () => dispatch(toAuthForm())
  };
}

class MainScreen extends React.Component {

  toAuth(e) {
    e.preventDefault();
    this.props.toAuth();
  }

  render() {
    return (
      <section>
        <button onClick={this.toAuth.bind(this)}>
          to auth
        </button>
      </section>
    );
  }
}

export default connect(null, mapDispatchToProps)(MainScreen);