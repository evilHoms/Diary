import React from 'react';
import './AuthForm.scss';
import AuthErrorMessage from './AuthMessage/AuthMessage.jsx';
import Loader from '../Loader/Loader.jsx';
import { connect } from 'react-redux';
import { toMainScreen, signinError, dbError, signupError, 
  newAccount, codeIsNeeded, loading, loaded } from '../../actions/actions.js';
import config from '../../../config.json';

const { auth, authResend } = config.routes;

const mapStateToProps = state => {
  return {
    pageState: state.pageState,
    isLoading: state.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signin: () => dispatch(toMainScreen()),
    signinError: () => dispatch(signinError()),
    dbError: () => dispatch(dbError()),
    signupError: () => dispatch(signupError()),
    newAccount: () => dispatch(newAccount()),
    codeIsNeeded: () => dispatch(codeIsNeeded()),
    loading: () => dispatch(loading()),
    loaded: () => dispatch(loaded())
  }
}

class AuthForm extends React.Component { 
  /* Component of autentification form */

  constructor(props) {
    super(props);
  }

  signin(e) {
    e.preventDefault();
    this.props.loading();
    const emailValue = this.email.value;
    const passValue = this.pass.value;
    const code = this.code ? this.code.value : '';
    console.log(code);
    const authPath = !code ? `${auth}?email=${emailValue}&pass=${passValue}` :
                             `${auth}?email=${emailValue}&pass=${passValue}&code=${code}`;
    fetch(authPath)
      .then(res => {
        if (res.status === 200) {
          this.props.signin();
        }
        else if (res.status === 202) {
          console.log('status 100');
          this.props.codeIsNeeded();
        }
        else if (res.status === 401) {
          this.props.signinError();
        }
        else if (res.status === 503) {
          this.props.dbError();
        }
      })
      .then(this.props.loaded)
      .catch(err => {
        this.props.loaded();
        console.log(err)
      });
  }

  signup(e) {
    e.preventDefault();
    this.props.loading();
    const emailValue = this.email.value;
    const passValue  = this.pass.value;
    const reqBody = JSON.stringify({
      email: emailValue,
      pass: passValue
    });
    const signupHeaders = new Headers();
    signupHeaders.append("Content-Type", "application/json");
    const fetchOpts = {
      headers: signupHeaders,
      method: "POST",
      body: reqBody
    }

    fetch(auth, fetchOpts)
      .then(res => {
        if (res.status === 200) {
          this.props.newAccount();
        }
        else if (res.status === 401) {
          this.props.signupError();
        }
        else if (res.status === 503) {
          this.props.dbError();
        }
      })
      .then(this.props.loaded)
      .catch(err => {
        this.props.loaded();
        console.log(err)
      });
  }

  remindPassword (e) {
    console.log('send email');
    e.preventDefault();
    this.props.loading();
    const emailValue = this.email.value;
    fetch(`${authResend}?password=true&email=${emailValue}`)
      .then(console.log)
      .then(this.props.loaded)
      .catch(err => {
        this.props.loaded();
        console.log(err);
      });
  }

  remindSecretCode (e) {
    console.log('send email');
    e.preventDefault();
    this.props.loading();
    const emailValue = this.email.value;
    fetch(`${authResend}?code=true&email=${emailValue}`)
      .then(console.log)
      .then(this.props.loaded)
      .catch(err => {
        this.props.loaded();
        console.log(err);
      });
  }

  onInput(e) {
    if (!this.email.checkValidity() || this.pass.value.length < 4) {
      this.signinBtn.disabled = true;
      this.signupBtn.disabled = true;
    }
    else {
      this.signinBtn.disabled = false;
      this.signupBtn.disabled = false;
    }
  }

  componentDidMount() {
    if (!this.email.checkValidity() || this.pass.value.length < 4) {
      this.signinBtn.disabled = true;
      this.signupBtn.disabled = true;
    }
  }

  render() {
    console.log(this.props.pageState, this.props.isLoading);
    const isMessage = this.props.pageState !== 'ok';
    const isLoading = this.props.isLoading;
    return (
      <div>
        <h1>Diary</h1>
        <form className='auth-form'>
          <h2>Identify yourself</h2>
          <input onInput={this.onInput.bind(this)} className='auth-form__email' ref={el => this.email = el} type="email" placeholder='Your email' />
          <input onInput={this.onInput.bind(this)} className='auth-form__pass' ref={el => this.pass = el} type="password" placeholder='Password' />
          <div>
            <button ref={el => this.signinBtn = el} onClick={this.signin.bind(this)}>
              Sign in
            </button>
            <button ref={el => this.signupBtn = el} onClick={this.signup.bind(this)}>
              Sign up
            </button>
          </div>
          <div>
            <button className="auth-form__remind-btn" onClick={this.remindPassword.bind(this)}>
              Remind me password
            </button>
          </div>
        </form>
        { isMessage && <AuthErrorMessage msgRef={el => this.code = el} type={this.props.pageState} /> }
        { isLoading && <Loader /> }        
      </div>
    )
  };

}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);