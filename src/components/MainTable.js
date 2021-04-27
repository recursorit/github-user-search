import { Button } from 'react-bootstrap'
import React from 'react'
import Table from 'react-bootstrap/Table'


const MainTable = ({posts,goBack,avatarSort,typeSort,loginSort,error,avatarSortD,typeSortD,loginSortD,avatarAsc,loginAsc,typeAsc}) => {

    
    const imgStyle = {
        height:'80px',
        width:'80px'
    }

    
    
    
    return(
        <div>
            <Button variant="outline-danger" onClick={goBack} className="my-4" >Go Back</Button>
            {
            
                <Table striped bordered hover size="sm" className="w-100" >
                    <thead>
                        <tr>
                        <th>{ avatarAsc ? <Button variant="dark" onClick={avatarSortD} >Avatar  ↑ </Button>  : 
                                <Button variant="dark" onClick={avatarSort} >Avatar </Button>
                            } 
                        </th>
                        <th>{ loginAsc ? <Button variant="dark"  onClick={loginSortD} >Login Id  ↑ </Button>  : 
                                <Button variant="dark" onClick={loginSort} >Login Id  </Button>
                            }
                        </th>
                        <th>{ typeAsc ? <Button variant="dark"  onClick={typeSortD} >Type  ↑ </Button>  : 
                                <Button variant="dark" onClick={typeSort} >Type</Button>
                            }
                        </th>
                        </tr>
                    </thead>
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
                </Table>

            }
        </div>
    )
}

export default MainTable