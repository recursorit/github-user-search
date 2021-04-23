import React from 'react'
import Table from 'react-bootstrap/Table'

const MainTable = (props) => {
    
    const imgStyle = {
        height:'80px',
        width:'80px'
    }
    
    return(
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                <th>Avatar</th>
                <th>Login Id</th>
                <th>Type</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.posts.map(post=>
                        <tr>
                        <td><img src={post.avatar_url} alt="Avatar logo" style={imgStyle}/> </td>
                        <td>{post.login}</td>
                        <td>{post.type}</td>
                        </tr>
                        )
                }
                    
            </tbody>
        </Table>
    )
}

export default MainTable