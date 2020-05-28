import React  from 'react'
 import { graphql } from 'react-apollo'
 import { getBookDetails } from '../Queries/Queries'


const BookDetails = ({data}) => {
    const displayBookDetail = () => {
        const { book } = data
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by : {book.author.name}</p>
                    <ul className="other-books">
                        {book.author.books.map(book => (
                            <li className="" key={book.id}>{book.name}</li>
                    ))}
                    </ul>
                </div>
            )
        } else {
            return <div>NO BOOKS SELECTED...</div>
        }
    }
    
    return (
        <div id="book-details">
            <p>OutPut book details</p> 
             {displayBookDetail()}  
        </div>
    )
}



 
export default graphql(getBookDetails, {
    options: ({selected}) => {
        return {
            variables: {
                id:selected
            }
        }
    }
})(BookDetails)
//export default graphql(getBookDetails)(BookDetails)


