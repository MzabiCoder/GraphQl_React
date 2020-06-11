import React from 'react';
import './index.css'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import BookList from './components/BookList'
import AddBook from './components/AddBook'


const client = new ApolloClient({
  uri:"/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="main">
        <h1>Ninja Reading List</h1>
        <BookList />  
        <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
