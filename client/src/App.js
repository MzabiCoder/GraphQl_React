import React from 'react';
import './index.css'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from '@apollo/react-hooks'
import BookList from './components/BookList'
import AddBook from './components/AddBook'


const client = new ApolloClient({
  uri:"http://localhost:5000/graphql"
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
        <BookList />  
        <AddBook/>
    </div>
    </ApolloProvider>
  );
}

export default App;
