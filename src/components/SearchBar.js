import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import MainTable from './MainTable'
import Pagination from './Pagination'
import lodash from 'lodash'
import Form from 'react-bootstrap/Form'

const SearchBar = () => {
    
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

    // useEffect(()=>{
    //     if(posts.length === 0){
    //        return setError(true)
    //     }
    // },[posts])

    //console.log(posts)

    return(
        <div>
            {showSearch ? <div className="bg-warning py-4">
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} className=" size-lg " />
            <Button onClick={handleClick} variant="outline-dark ml-2" disabled={!search}  >Search</Button>
            </div> : <div></div> }
            

            {showTable ?  <div className="px-5">
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
                <Form>
                <Form.Group controlId="exampleForm.SelectCustom" onChange={(e)=>setPostPerPage(e.target.value)}>
                    <Form.Label>Select no. of posts</Form.Label>
                    <Form.Control as="select" custom>
                    <option>9</option>
                    <option>5</option>
                    <option>15</option>
                    <option>25</option>
                    <option>50</option>
                    </Form.Control>
                </Form.Group>
                </Form>
                <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
            </div> : <div></div> }
            
        </div>
    )
}

export default SearchBar