import React, { useState } from 'react'
import axios from 'axios'
import {Button,Row,Col} from 'react-bootstrap'
import MainTable from './MainTable'
import Pagination from './Pagination'
import lodash from 'lodash'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner'

const AppContainer = () => {
    
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState('')
    const [loading,setLoading] = useState(false)
    
    const [showSearch,setShowSearch] = useState(true)

    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(9)

    const [error,setError] = useState(false)

    const [sort,setSort]= useState('login')
    const [order,setOrder] = useState('asc')
    
    const BASE_URL = 'https://api.github.com';

    const generateURL = (searchItem) => {
        return `?q=${encodeURIComponent(`${searchItem} in:login`)}&per_page=100`
      }


    const handleClick = () => {
        setLoading(true)
        axios.get(`${BASE_URL}/search/users${generateURL(search)}`)
        .then(res =>{        
            setPosts(res.data.items)

            setShowSearch(false);
            setLoading(false)

            if(res.data.total_count === 0){
               return setError(true)
            } else {
                return null
            }
        })
        .catch(err =>{
            console.log(err)
        })
        if(posts){
            
        }    
        
        
    }

    
    const SortFunc = (e) => {
        const sortA = lodash.orderBy(posts,[e], [order] )
        setPosts(sortA)
        if(order==='asc'){
            setOrder('desc')
        } else {
            setOrder('asc')
        }
        
        setSort(e)
    }


    const goBack = () => {
        setShowSearch(true);
        setSearch('')
        setPosts([])
        setPostPerPage(9)
        setCurrentPage(1)
        setSort('login')
        setOrder('asc')
        setError(false)
    }

    
    const indexOfLastPost = currentPage*postPerPage;
    const indexOffirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOffirstPost,indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextBtn = () => {
        setCurrentPage(currentPage+1)
    }

    const prevBtn = () => {
        setCurrentPage(currentPage-1)    
    }

   

    let pageIncBtn = null;
    if( currentPage + 1  < Math.ceil(posts.length/postPerPage)) {
        pageIncBtn = <li><Button variant="light" className="text-primary" disabled >...</Button></li>
    }

    

    let pageDecBtn = null;
    if( currentPage - 1  > 1) {
        pageDecBtn = <li><Button variant="light" className="text-primary" disabled >...</Button></li>
    }
    

    

    

    

    return(
        <div>
            {showSearch ? <div className=" py-4 searchContainer ">
            <h2 className="display-3">Search for user here</h2>    
            <input autoFocus  type="text" value={search} onChange={e=>setSearch(e.target.value)} className="mt-3 p-2 rounded " placeholder="Type here"/>
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
            </div> : 
            <Row className="px-4 py-2 tableContainer" xs={1} >
                <Col >
                <MainTable posts={currentPosts}
                 goBack={goBack}
                 sort={sort}
                 SortFunc={SortFunc}
                 order={order}
                 error={error}
                 />
                 </Col>
                <Col> 
                <Form className="xs-12 d-flex justify-content-center">
                <Form.Group controlId="exampleForm.SelectCustom" onChange={(e)=>setPostPerPage(e.target.value)}>
                    <Form.Label >Select no. of Rows</Form.Label>
                    <Form.Control   as="select" custom>
                    <option>9</option>    
                    <option>12</option>
                    <option>15</option>
                    <option>25</option>
                    <option>50</option>
                    </Form.Control>
                </Form.Group>
                </Form>
                </Col>
                <Col >
                    <Row className="px-3" xs={1}>
                        
                        <ul className="pagination  justify-content-center ">
                        <li><Button variant="light"
                         className="text-primary"
                         onClick={prevBtn}
                         disabled={currentPage === 1 ? true : false} >prev</Button></li> 

                        {pageDecBtn}   

                        <Pagination
                        postsPerPage={postPerPage}
                        totalPosts={posts.length} 
                        paginate={paginate}                                               
                        currentPage={currentPage}
                        />

                        {pageIncBtn} 

                        <li><Button variant="light"
                         className="text-primary" 
                         onClick={nextBtn} 
                         disabled={currentPage === Math.ceil(posts.length/postPerPage) ? true : false} >next</Button></li> 
                        </ul>
                        
                    </Row> 
                </Col>
            </Row>
            
            }
                
        </div>
    )
}

export default AppContainer