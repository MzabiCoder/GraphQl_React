import React from 'react'
 import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import Spinner from './Spinner'


const getBookQuery = gql`
{
    books{
      name
      id
    }
}

`

const BookList=({data:{books,loading}})=> {
  

    if (loading) {
        return <Spinner/>
    }
     
    return (
        <div>
            <ul id="book-list">
                {books.length !== 0 && books.map(book => (
                    <li key={book.id}>{book.name}</li>
             ))}
            </ul>
        </div>
    )
}

 

export default graphql(getBookQuery) (BookList)

