import React, { useState } from 'react';
import { LoginButton } from '@inrupt/solid-ui-react';
import './App.css';

const authOptions = {
  clientName: 'Solid To-do app',
};


function App() {
  const [oidcIssuer, setOidcIssuer] = useState('');

  const handleChange = (e) => {
    setOidcIssuer(e.target.value);
  }

  return (
    <div className="app-container">
      <span>
        <input type="text"
               className="oidc-issuer-input"
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
      <LoginButton oidcIssuer={oidcIssuer}
                   redirectUrl={window.location.href}
                   authOptions={authOptions}
      />

    </div>
  );
}

export default App;
