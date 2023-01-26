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
import { Redirect, Link } from "react-router-dom";

function App() {
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    confirm: '',
    isAgree: false
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

  const onSubmitSignupForm = (e) => {
    if (e) e.preventDefault();
    console.log(JSON.stringify(signupForm, null, 1));
  };
  
  const onSubmitLoginForm = (e) => {
    if (e) e.preventDefault();
    console.log(JSON.stringify(loginForm, null, 1));
  };

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
          <MDBInput wrapperClass='mb-4' label='Re-enter' name='confirm' type='password' onChange={onUpdateSignupField}/>

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