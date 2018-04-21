import React from 'react';
import './App.scss';
import AuthForm from '../AuthForm/AuthForm.jsx';
import MainScreen from '../MainScreen/MainScreen.jsx';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    page: state.page
  }
}

class App extends React.Component {
  /* Main component */ 

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className='app'>
        { 
          this.props.page === 'auth_form' ?
          <AuthForm /> :
          this.props.page === 'main_screen' ?
          <MainScreen /> :
          null
        }
      </section>
    );
  }
}

export default connect(mapStateToProps)(App);