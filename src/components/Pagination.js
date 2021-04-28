import React from 'react'
import {Button} from 'react-bootstrap'

const Pagination = ({postsPerPage,totalPosts,paginate,minPageNumberLimit,maxPageNumberLimit}) => {
    const pageNumbers = []

    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }

    return(
        <nav >
            <ul className="pagination ">
                
                {pageNumbers.map(number => {
                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit){
                        return (
                            <li key={number} className="page-item">
                                <Button onClick={()=>paginate(number)}  className="page-link ">
                                    {number}
                                </Button>
                            </li>
                        )
                    } else {
                        return null;
                    }
                })}
                 
            </ul>
        </nav>
    )
}

export default Pagination