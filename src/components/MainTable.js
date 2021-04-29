import { Button } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import lodash from 'lodash'

const MainTable = ({posts,goBack,error}) => {

    const [rows,setRows] = useState([])
    useEffect(()=>{
        setRows(posts)
    },[posts])
    console.log(rows)
    const imgStyle = {
        height:'80px',
        width:'80px'
    }

    const [sort,setSort]= useState(false)
    const [order,setOrder] = useState('asc')

    const SortFunc = (e) => {
        const sortA = lodash.orderBy(posts,[e], [order] )
        setRows(sortA)
        if(order==='asc'){
            setOrder('desc')
        } else {
            setOrder('asc')
        }
        
        setSort(true)
    }
 
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
                //error ? <h2>no result found </h2>:
                <Table striped bordered hover size="sm" className="datatable" >
                    {
                         <thead>
                                    <tr>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('avatar_url')} >Avatar </Button>
                                        
                                    </th>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('login')} >Login Id  </Button>
                                        
                                    </th>
                                    <th> 
                                            <Button variant="dark" onClick={()=>SortFunc('type')} >Type</Button>
                                        
                                    </th>
                                    </tr>
                                </thead> 
                    }
                    {
                        sort ? <tbody>
                                    {
                                        rows.map(post=>
                                            <tr key={post.id}>
                                            <td><img src={post.avatar_url} alt="Avatar logo" style={imgStyle}/> </td>
                                            <td>{post.login}</td>
                                            <td>{post.type}</td>
                                            </tr>
                                            )
                                    }
                                        
                                </tbody> :
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