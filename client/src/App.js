import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';

// components imports
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import AuthorList from './components/AuthorList'
import AddAuthor from './components/AddAuthor'



//apollo client setup 
const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})


class App extends Component {
  render() {
    return (
    <ApolloProvider client={client}>      
      <div id="main">
        <h1>Reading list</h1>
        <BookList/>
        <AddBook/>
        <h1>Author list</h1>
        <AuthorList/>
        <AddAuthor/>
      </div>
    </ApolloProvider>
    );
  }
}

export default App;