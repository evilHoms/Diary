import React from 'react';
import PropTypes from 'prop-types';
import './AuthMessage.scss';

const propTypes = () => {
  return {
    type: PropTypes.string,
    msgRef: PropTypes.func
  }
}

const defaultProps = () => {
  return {
    type: "ok",
    msgRef: () => console.log('empty ref function in AuthMessage')
  }
}

const AuthErrorMessage = (props) => {
  return (
    <div>
      { props.type === 'signin_error' ? 
          <p>Entered email or password is not correct</p> :
        props.type === 'db_error' ?
          <p>Connection to db error, try again later</p> :
        props.type === 'signup_error' ?
          <p>Account with entered email already exists. If you forgot password, press signup once more, and mail with password will be sent on it</p> :
        props.type === 'new_account' ?
          <p>email with confirmation sent, you can sign in with entered email adress, password and secret code from email with confirmation</p> :
        props.type === 'code_is_needed' ?
          <p>you did not confirm your email, please, enter secret code to the field.</p> :
          null
      }
      { (props.type === 'new_account' || props.type ==='code_is_needed') ?
          <input ref={props.msgRef} type="text" placeholder="Secret Code"/> :
          null
      }
    </div>
  );
};

export default AuthErrorMessage;