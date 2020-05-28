import React,{useState} from 'react'
import { getBookQuery } from '../Queries/Queries.js'
import { graphql } from 'react-apollo'
import Spinner from './Spinner'
import BookDetails from './BookDetails'



const BookList=({data:{books,loading}})=> {
  const [selected,setSelected]=useState(null)

    if (loading) {
        return <Spinner/>
    }
     
    return (
        <div>
            <ul id="book-list">
          {books.length !== 0 && books.map(book => (
            <li key={book.id} onClick={e=>setSelected(book.id)} >{book.name}</li>
             ))}
            </ul>
            <BookDetails selected={selected} />
        </div>
    )
}

 

export default graphql(getBookQuery) (BookList)

