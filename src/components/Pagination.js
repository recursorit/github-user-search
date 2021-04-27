import React from 'react'

const Pagination = ({postsPerPage,totalPosts,paginate}) => {
    const pageNumbers = []

    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }

    return(
        <nav className="pagenav col-12-sm" >
            <ul className="pagination ">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={()=>paginate(number)}  className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination