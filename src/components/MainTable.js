import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'


const MainTable = ({posts,goBack,error,sort,SortFunc,order}) => {
    
    const imgStyle = {
        height:'80px',
        width:'80px'
    }
    

    const [arrow,setArrow] = useState("")
    

    const dirArrow = () => {
        
        if (order==="asc"){
             setArrow("↑")
        } else if(order==="desc"){
             setArrow("↓")
        } else {
             setArrow("")
        }
        
    }
    // eslint-disable-next-line
     useEffect(()=>dirArrow,[posts])


    // const [error,setError] = useState(false)
    
    // const findError =()=>{
    //     if(posts.length < 1){
    //         setError(true)
    //     } else {
    //          setError(false)
    //     }
    // }
    // console.log(posts.length)
    // findError()


    return(
        <div>
            <Button variant="outline-danger" onClick={goBack} className="my-4" >Go Back</Button>
            {
                error ? <h2>no result found </h2>:
                <Table striped bordered hover size="sm" className="datatable" >
                    {
                         <thead>
                                    <tr>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('avatar_url')} >Avatar 
                                            {sort==='avatar_url' ? arrow : null } 
                                            </Button>                                        
                                    </th>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('login')} >Login Id 
                                            {sort==='login' ? arrow  : null }
                                             </Button>                                        
                                    </th>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('type')} >Type
                                            {sort==='type' ? arrow : null }
                                            </Button>                                        
                                    </th>
                                    </tr>
                                </thead> 
                    }
                    {                        
                                <tbody>
                                    {
                                        posts.map(post=>
                                            <tr key={post.id}>
                                            <td><img src={post.avatar_url} alt="Avatar logo" style={imgStyle}/> </td>
                                            <td>{post.login}</td>
                                            <td>{post.type}</td>
                                            </tr>
                                            )
                                    }                                        
                                </tbody>
                    }
                </Table>
            }
        </div>
    )
}

export default MainTable