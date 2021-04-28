import React, { useState } from 'react'
import axios from 'axios'
import {Button,Row,Col} from 'react-bootstrap'
import MainTable from './MainTable'
import Pagination from './Pagination'
import lodash from 'lodash'
import Form from 'react-bootstrap/Form'

const AppContainer = () => {
    
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState('')
    
    const [showSearch,setShowSearch] = useState(true)
    const [showTable,setShowTable]=useState(false)

    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(9)

    // const [error,setError] = useState(false)

    const [avatarAsc,setAvatarAsc] = useState(false)
    const [loginAsc,setLoginAsc] = useState(true)
    const [typeAsc,setTypeAsc] = useState(false)


    const pageNumberLimit = 3
    const [maxPageNumberLimit,setmaxPageNumberLimit] = useState(3)
    const [minPageNumberLimit,setminPageNumberLimit] = useState(0)

    

    const handleClick = () => {
        axios.get(`https://api.github.com/search/users?q=${search} in:login&per_page=100`)
        .then(res =>{
            console.log(res)
            const response = lodash.sortBy(res.data.items,["login"])
            setPosts(response)
        })
        .catch(err =>{
            console.log(err)
        })

        setShowSearch(false);
        setShowTable(true)
    }

    const goBack = () => {
        setShowSearch(true);
        setShowTable(false);
        setSearch('')
        setPosts([])
        setPostPerPage(9)
        setAvatarAsc(false)
        setLoginAsc(true)
        setTypeAsc(false)
        setCurrentPage(1)
        setmaxPageNumberLimit(3)
        setminPageNumberLimit(0)
        // setError(false)
    }

    const avatarSort = () => {
        const asort = lodash.orderBy(posts,['avatar_url'], ['asc', 'desc'])
        setPosts(asort)
        setAvatarAsc(true)
        setLoginAsc(false)
        setTypeAsc(false)
    }

    const typeSort = () => {
        const tsort = lodash.orderBy(posts,['type'], ['asc', 'desc'] )
        setPosts(tsort)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(true)
    }

    const loginSortD = () => {
        const lsortD = lodash.orderBy(posts,['login'], ['asc', 'desc'] ).reverse()
        setPosts(lsortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }

    const avatarSortD = () => {
        const asortD = lodash.orderBy(posts,['avatar_url'], ['asc', 'desc']).reverse()
        setPosts(asortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }

    const typeSortD = () => {
        const tsortD = lodash.orderBy(posts,['type'], ['asc', 'desc'] ).reverse()
        setPosts(tsortD)
        setAvatarAsc(false)
        setLoginAsc(false)
        setTypeAsc(false)
    }

    const loginSort = () => {
        const lsort = lodash.orderBy(posts,['login'], ['asc', 'desc'] )
        setPosts(lsort)
        setAvatarAsc(false)
        setLoginAsc(true)
        setTypeAsc(false)
    }

    const indexOfLastPost = currentPage*postPerPage;
    const indexOffirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOffirstPost,indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const nextBtn = () => {
        setCurrentPage(currentPage+1)
        if(currentPage+1 > maxPageNumberLimit){
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
        if(currentPage+1 > Math.ceil(posts.length/postPerPage)){
            setCurrentPage(currentPage)
        }

    }

    const prevBtn = () => {
        setCurrentPage(currentPage-1)
        if((currentPage - 1) % minPageNumberLimit === 0){
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
        if(currentPage-1 < 1){
            setCurrentPage(currentPage)
        }
    }

    const dotInc = () => {
        setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }

    let pageIncBtn = null;
    if( maxPageNumberLimit  < Math.ceil(posts.length/postPerPage)) {
        pageIncBtn = <li><Button variant="light" className="text-primary" onClick={dotInc} >...</Button></li>
    }

    const dotDec = () => {
        setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }

    let pageDecBtn = null;
    if( minPageNumberLimit  > 1) {
        pageDecBtn = <li><Button variant="light" className="text-primary" onClick={dotDec} >...</Button></li>
    }
    

    // useEffect(()=>{
    //     if(posts.length === 0){
    //        return setError(true)
    //     }
    // },[posts])

    //console.log(posts)

    

    return(
        <div>
            {showSearch ? <div className=" py-4 searchContainer ">
            <h2 className="display-3">Search for user here</h2>    
            <input autoFocus  type="text" value={search} onChange={e=>setSearch(e.target.value)} className="mt-3 p-2 rounded " placeholder="Type here"/>
            <div className="my-3"><Button onClick={handleClick} variant="outline-dark ml-2" disabled={!search}  >Search</Button></div>
            </div> : <div></div> }
            

            {showTable ?  <Row className="px-4 py-2 tableContainer" xs={1} >
                <Col >
                <MainTable posts={currentPosts}
                 goBack={goBack}
                 avatarSort={avatarSort}
                 typeSort={typeSort} 
                 loginSortD={loginSortD}
                 avatarSortD={avatarSortD}
                 typeSortD={typeSortD}
                 loginSort={loginSort}
                 avatarAsc={avatarAsc}
                 loginAsc={loginAsc}
                 typeAsc={typeAsc}
                //  error={error}
                 />
                 </Col>
                <Col> 
                <Form className="xs-12">
                <Form.Group controlId="exampleForm.SelectCustom" onChange={(e)=>setPostPerPage(e.target.value)}>
                    <Form.Label>Select no. of posts</Form.Label>
                    <Form.Control as="select" custom>
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
                        <ul className="pagination ">
                        <li><Button variant="light" className="text-primary" onClick={prevBtn} disabled={currentPage === 1 ? true : false} >prev</Button></li> 
                        {pageDecBtn}   
                        <Pagination
                        postsPerPage={postPerPage}
                        totalPosts={posts.length} 
                        paginate={paginate} 
                        pageNumberLimit={pageNumberLimit}
                        maxPageNumberLimit={maxPageNumberLimit}
                        minPageNumberLimit={minPageNumberLimit}
                        currentPage={currentPage}
                        />
                        {pageIncBtn} 
                        <li><Button variant="light" className="text-primary" onClick={nextBtn} disabled={currentPage === Math.ceil(posts.length/postPerPage) ? true : false} >next</Button></li> 
                        </ul>
                    </Row> 
                </Col>
            </Row> : <div></div> }
            
        </div>
    )
}

export default AppContainer