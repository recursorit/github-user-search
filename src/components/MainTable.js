import { Button } from 'react-bootstrap'
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import lodash from 'lodash'

const MainTable = ({posts,goBack,error}) => {

    const [rows,setRows] = useState(posts)
    console.log(rows)
    const imgStyle = {
        height:'80px',
        width:'80px'
    }

    const [sort,setSort]= useState(false)
    const [order,setOrder] = useState('Asc')

    const SortAsc = (e) => {
        const sortA = lodash.orderBy(posts,[e], ['asc', 'desc'] )
        setRows(sortA)
        setOrder('Desc')
        setSort(true)
    }

    const SortDec = (e) => {
        const sortD = lodash.orderBy(posts,[e], ['asc', 'desc'] ).reverse()
        setRows(sortD)
        setOrder('Asc')
        setSort(false)
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
                        sort ? <thead>
                                    <tr>
                                    <th>{ order === 'Asc' ? <Button variant="dark" onClick={SortDec('avatar_url')} >Avatar  ↑ </Button>  : 
                                            <Button variant="dark" onClick={SortAsc('avatar_url')} >Avatar </Button>
                                        } 
                                    </th>
                                    <th>{ order === 'Asc' ? <Button variant="dark"  onClick={SortDec('login')} >Login Id  ↑ </Button>  : 
                                            <Button variant="dark" onClick={SortAsc('login')} >Login Id  </Button>
                                        }
                                    </th>
                                    <th>{ order === 'Asc' ? <Button variant="dark"  onClick={SortDec('type')} >Type  ↑ </Button>  : 
                                            <Button variant="dark" onClick={SortAsc('type')} >Type</Button>
                                        }
                                    </th>
                                    </tr>
                                </thead> : 
                                <thead>
                                    <tr>
                                        <th><Button variant="dark" onClick={SortAsc('avatar_url')} >Avatar </Button></th>
                                        <th> <Button variant="dark" onClick={SortAsc('login')} >Login Id  </Button></th>
                                        <th> <Button variant="dark" onClick={SortAsc('type')} >Type</Button></th>
                                    </tr>
                                </thead>
                    }
                    <tbody>
                        {
                            rows.map(post=>
                                <tr key={post.id}>
                                <td><img src={post.avatar_url} alt="Avatar logo" style={imgStyle}/> </td>
                                <td>{post.login}</td>
                                <td>{post.type}</td>
                                </tr>
                                )
                        }
                            
                    </tbody>
                </Table>

            }
        </div>
    )
}

export default MainTable