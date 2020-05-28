import { gql } from 'apollo-boost'
const getBookQuery = gql`
{
    books{
      name
      id
    }
}`
const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}`

const addBookQueryMutation = gql`
mutation($name:String!,$genre:String!,$authorID:ID!){
    addBook(name:$name,genre:$genre,authorID:$authorID){
    name
    id
     
}
}
`

const getBookDetails = gql`
query($id:ID){
    book(id:$id){
        id,
        name,
        genre,
        author{
            id,
            name,
            age
            books{
                name,
                id
            }
        }
    }
}

`

export {getBookQuery,getAuthorsQuery,addBookQueryMutation,getBookDetails}