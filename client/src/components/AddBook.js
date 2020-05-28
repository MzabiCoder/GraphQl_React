import React,{useState} from 'react'
import { graphql } from 'react-apollo'
import { compose } from "recompose";
import { getAuthorsQuery, addBookQueryMutation,getBookQuery} from '../Queries/Queries'


const AddBook = ({addBookQueryMutation, getAuthorsQuery: { authors, loading } }) => {
    // console.log(addBookQueryMutation)
    const [name,setName]=useState('')
    const [genre,setGenre]=useState('')
    const [authorID,setAuthorid]=useState('')
    const submit = e => {
        e.preventDefault()
      //  console.log(authorID);
        addBookQueryMutation({
            variables: {
                name,
                genre,
                authorID
            },
            refetchQueries:[{query:getBookQuery}]

           
            
       })
        
    }
    return (
        <div>
            <form action="" onSubmit={submit}>
                <div className="field">
                    <label htmlFor="">Book Name</label>
                    <input onChange={e => setName(e.target.value)} value={name} type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Book Genre</label>
                    <input onChange={e => setGenre(e.target.value)} value={genre} type="text"/>
                </div>
                <div className="field">
                    <label htmlFor="">Author:</label>
                    <select onChange={e=>setAuthorid(e.target.value)} >
                        {loading ? <option  >Loading Authors...</option> :
                            authors.map(author => (
                            <option key={author.id}  value={author.id}>{author.name}</option>
                            ))} 
                    </select>
                </div>
                <button>+</button>
            </form> 
        </div>
    )
}

 

 
export default compose(
    graphql(getAuthorsQuery, { name:"getAuthorsQuery" }),
    graphql(addBookQueryMutation,{name:"addBookQueryMutation"})
)(AddBook)
 