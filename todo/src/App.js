import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTodo } from './graphql/mutations';
import { generateClient  } from 'aws-amplify/api';

import awsExports from './aws-exports';
Amplify.configure(awsExports);

async function storeTodo(){
  const client = generateClient();

  const result = await client.graphql({
    query: createTodo,
    variables: {
      input: {
        name:"wash windows"
      }
    }
  })
}

const App = () => {
  return (
    <Authenticator>
      {({ signOut, user}) => (
        <main>
          <h1>Welcome {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={storeTodo}>New Todo</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;