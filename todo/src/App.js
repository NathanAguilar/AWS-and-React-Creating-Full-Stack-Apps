import React from "react";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations';
import { generateClient  } from 'aws-amplify/api';
import { listTodos, getTodo } from "./graphql/queries";

import awsExports from './aws-exports';
Amplify.configure(awsExports);

const client = generateClient();

async function storeTodo(){
  const result = await client.graphql({
    query: createTodo,
    variables: {
      input: {
        name:"wash windows"
      }
    }
  })
}

async function changeTodo(){
  const result = await client.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: "1370123a-af1d-4fb3-b345-991e3b179cd6",
        name:"updated"
      }
    }
  });
}

async function removeTodo(){
  const result = await client.graphql({
    query: deleteTodo,
    variables: {
      input: {
        id: "1370123a-af1d-4fb3-b345-991e3b179cd6"
      }
    }
  });
}

async function fetchTodos() {
  const result = await client.graphql({
    query: listTodos
  });
  console.log(result);
}

async function fetchTodo() {
  const result = await client.graphql({
    query: getTodo,
    variables: { id: "1370123a-af1d-4fb3-b345-991e3b179cd6"}
  });
  console.log(result);
}


const App = () => {
  return (
    <Authenticator>
      {({ signOut, user}) => (
        <main>
          <h1>Welcome {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
          <button onClick={storeTodo}>New Todo</button>
          <button onClick={fetchTodos}>Fetch Todos</button>
          <button onClick={fetchTodo}>Fetch Todo</button>
          <button onClick={changeTodo}>Change Todo</button>
          <button onClick={removeTodo}>Delete Todo</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;