import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import MainTable from './MainTable'
import Pagination from './Pagination'
import lodash from 'lodash'

const SearchBar = () => {
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState('')
    const [searchByButton,setSearchByButton] = useState('')

    const [currentPage,setCurrentPage] = useState(1)
    const [postPerPage,setPostPerPage] = useState(9)

    const [show,setShow]= useState(false)

    const handleClick = () => {
        setSearchByButton(search)
        setShow(true)
    }

    const indexOfLastPost = currentPage*postPerPage;
    const indexOffirstPost = indexOfLastPost - postPerPage;
    const currentPosts = posts.slice(indexOffirstPost,indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(()=>{
        axios.get(`https://api.github.com/search/users?q=${searchByButton} in:login&per_page=100`)
        .then(res =>{
            console.log(res)
            const response = lodash.sortBy(res.data.items,["login"])
            setPosts(response)
        })
        .catch(err =>{
            console.log(err)
        })
    },[searchByButton])

    //console.log(posts)

    return(
        <div>
            <div className="bg-warning py-4">
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} className=" size-lg " />
            <Button onClick={handleClick} variant="outline-dark ml-2" >Search</Button>
            </div>
            <div className="px-5">
            {
                show ?<div> <MainTable posts={currentPosts} />
                <Pagination postsPerPage={postPerPage} totalPosts={posts.length} paginate={paginate} />
                </div> : null
            }
            </div>
        </div>
    )
}

export default SearchBar