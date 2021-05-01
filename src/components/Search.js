import React from 'react'
import { Button } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'

const Search =({handleClick,search,loading,setSearch})=> {
    return (
        <div className=" py-4 searchContainer ">
            <h2 className="display-3">Search for user here</h2>    
            <input autoFocus  type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="mt-3 p-2 rounded " placeholder="Type here"/>
            <div className="my-3"><Button onClick={handleClick} variant="outline-dark ml-2" disabled={!search || loading}   >
                {loading ? <Spinner
                            className="mr-2"
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />:null} 
                Search</Button></div>
        </div>
    )
}

export default Search