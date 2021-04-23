import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table'
import MainTable from './MainTable'

const SearchBar = () => {
    const [posts,setPosts] = useState([])
    const [search,setSearch] = useState('')
    const [searchByButton,setSearchByButton] = useState('')

    const handleClick = () => {
        setSearchByButton(search)
    }

    useEffect(()=>{
        axios.get(`https://api.github.com/search/users?q=${searchByButton} in:login&per_page=100`)
        .then(res =>{
            console.log(res)
            setPosts(res.data.items)
        })
        .catch(err =>{
            console.log(err)
        })
    },[searchByButton])

    //console.log(posts)

    return(
        <div>
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} />
            <button onClick={handleClick} >Search</button>
            <div>
            <MainTable posts={posts} />
            </div>
        </div>
    )
}

export default SearchBar