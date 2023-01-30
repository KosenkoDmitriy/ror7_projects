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
// import { Navigate, Link } from "react-router-dom";
import { userLogin, userSignup, userLogout } from '../actions/userAction';
import Projects from '../pages/Projects';
import Message from '../components/Message';

function App() {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(0);
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

  const [justifyActive, setJustifyActive] = useState('login');

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
    if (response.data) setUserId(response.data.id)
    notificationShow(response)
  };

  function notificationHide() {
    setError('');
    setMessage('');
  }

  function notificationShow(response) {
    console.log('notificationShow', response)
    const message = response.error || response.status.message;
    if (response.ok || (response.status && response.status.code == (200 || 201))) {
      setMessage(message);
      setIsLoggedIn(true);
      setJustifyActive('prjs')
    } else if (response.error || (response.status && response.status.code == 401)) {
      setError(message);
      setIsLoggedIn(false);
    } else {
      setError(message);
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


  const onLogout = async (e) => {
    if (e) e.preventDefault();
    notificationHide();
    const response = await userLogout(userId);
    notificationShow(response)
    if (response.status.code == 200) {
      setIsLoggedIn(false);
      setJustifyActive('login')
    }
    else {
      setJustifyActive('prjs')
      setIsLoggedIn(true);
    }
  };


  // if (isLoggedIn) return <Navigate to='/projects' replace={true} />
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      {!isLoggedIn ?

        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('login')} active={justifyActive === 'login'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>

          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('signup')} active={justifyActive === 'signup'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>

        </MDBTabs>
        :
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            {/* <Link to='/projects'> */}
            <MDBTabsLink onClick={() => handleJustifyClick('prjs')} active={justifyActive === 'prjs'}>
              Projects
            </MDBTabsLink>
            {/* </Link> */}
          </MDBTabsItem>

          <MDBTabsItem>
            <MDBTabsLink onClick={() => onLogout()} active={false}>
              Logout
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
      }

      <Message error={error} message={message} />

      <MDBTabsContent>

        <MDBTabsPane show={justifyActive === 'login'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>
          </div>
          <form onSubmit={onSubmitLoginForm}>

            <MDBInput wrapperClass='mb-4' label='Email address' name='email' type='email' onChange={onUpdateLoginField} />
            <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={onUpdateLoginField} />

            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'signup'}>

          <div className="text-center mb-3">
            <p>Sign up with:</p>
          </div>
          <form onSubmit={(e) => { onSubmitSignupForm(e) }}>
            <MDBInput wrapperClass='mb-4' label='Email' name='email' type='email' onChange={onUpdateSignupField} />
            <MDBInput wrapperClass='mb-4' label='Password' name='password' type='password' onChange={onUpdateSignupField} />
            <MDBInput wrapperClass='mb-4' label='Re-enter' name='password_confirmation' type='password' onChange={onUpdateSignupField} />

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn type="submit" className="mb-4 w-100">Sign up</MDBBtn>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'prjs'}>
          <Projects />
        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;