import React from "react";
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator>
      {({ user}) => (
        <main>
          <h1>Welcome {user.username}</h1>
        </main>
      )}
    </Authenticator>
  );
}

export default App;