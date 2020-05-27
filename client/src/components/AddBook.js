import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getAuthorsQuery = gql`
{
    authors{
        name
        id
    }
}
`

const AddBook = ({ data:{authors,loading} }) => {
    
    const submit = e => {
        
    }
    return (
        <div>
            <form action="" onSubmit={submit}>
                <div className="field">
                    <label htmlFor="">Book Name</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Book Genre</label>
                    <input type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Author:</label>
                    <select >
                        {loading ? <option  >Loading Authors...</option> :
                            authors.map(author => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))} 
                    </select>
                </div>
                <button>+</button>
            </form> 
        </div>
    )
}

 

 
export default graphql(getAuthorsQuery) (AddBook)