import React, { useState } from 'react';
import {
          LoginButton,
          LogoutButton,
          Text,
          useSession,
          CombinedDataProvider,
       } from '@inrupt/solid-ui-react';
import './App.css';

const authOptions = {
  clientName: 'Solid To-do app',
};


function App() {
  const { session } = useSession();
  const [oidcIssuer, setOidcIssuer] = useState('');

  const handleChange = (e) => {
    setOidcIssuer(e.target.value);
  }

  return (
    <div className="app-container">
      {session.info.isLoggedIn ? (
        <CombinedDataProvider
          datasetUrl={session.info.webId}
          thingUrl={session.info.webId}
        >
          <div className="message logged-in">
            <span>You are logged in as: </span>
            <Text properties={[
                "http://www.w3.org/2006/vcard/ns#fn",
                "http://xmlns.com/foaf/0.1/name",
              ]}
            />
            <LogoutButton />
          </div>
        </CombinedDataProvider>
      ) : (
        <div className="message">
          <span>You are not logged in. </span>
          <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
           <datalist id="providers">
             <option value="https://broker.pod.inrupt.com/" />
             <option value="https://inrupt.net/" />
           </datalist>
          </span>
          <LoginButton
            oidcIssuer={oidcIssuer}
            redirectUrl={window.location.href}
            authOptions={authOptions}
          />
        </div>
      )}
    </div>
  );
}

export default App;
