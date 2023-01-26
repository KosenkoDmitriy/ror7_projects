import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Navigate, Link } from "react-router-dom";
import { userLogin, userSignup } from '../actions/userAction';

function App() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    // isAgree: false
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    isRemember: false
  });

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }
    setJustifyActive(value);
  };

  const onSubmitSignupForm = async (e) => {
    if (e) e.preventDefault();
    // console.log(JSON.stringify(signupForm, null, 1));
    notificationHide();
    const response = await userSignup(signupForm);
    notificationShow(response)
  };
  
  const onSubmitLoginForm = async (e) => {
    if (e) e.preventDefault();
    notificationHide();
    const response = await userLogin(loginForm);
    notificationShow(response)
  };

  function notificationHide() {
    setError('');
    setMessage('');
  }

  function notificationShow(response) {
    if (response.ok || response.status.code == (200 || 201)) {
      setMessage(response.status.message);
      setIsLoggedIn(true);
    } else {
      const message = response.error || response.status.message;
      setError(message);
      setIsLoggedIn(false);
    }
  }

  const onUpdateSignupField = (e) => {
    if (e) e.preventDefault();
    const formNew = { ...signupForm, [e.target.name]: e.target.value }
    setSignupForm(formNew)
  }

  const onUpdateLoginField = (e) => {
    if (e) e.preventDefault();
    const formNew = { ...loginForm, [e.target.name]: e.target.value }
    setLoginForm(formNew)
  }

  if (isLoggedIn) return <Navigate to='/projects' replace={true} />
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <Link to='/projects'>Projects</Link>
      
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <div className="error">{ error }</div>
      <div className="message">{ message }</div>

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>
          </div>
          <form onSubmit={onSubmitLoginForm}>

          <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' onChange={onUpdateLoginField}
          />
          <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={onUpdateLoginField}/>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign up with:</p>
          </div>
          <form onSubmit={(e) => {onSubmitSignupForm(e)}}>
          <MDBInput wrapperClass='mb-4' label='Email' name='email' type='email' onChange={onUpdateSignupField}/>
          <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={onUpdateSignupField}/>
          <MDBInput wrapperClass='mb-4' label='Re-enter' name='password_confirmation' type='password' onChange={onUpdateSignupField}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;