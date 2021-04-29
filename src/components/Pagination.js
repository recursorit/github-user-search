import React from 'react'
import {Button} from 'react-bootstrap'

const Pagination = ({postsPerPage,totalPosts,paginate,currentPage}) => {
    const pageNumbers = []

    for(let i=1; i<= Math.ceil(totalPosts/postsPerPage);i++){
        pageNumbers.push(i);
    }

   

    return(
        <nav >
            <ul className="pagination ">
                
                {pageNumbers.map(number => {
                    if (number < currentPage + 2 && number > currentPage - 2){
                        return (
                            <li key={number} className="page-item">
                                <Button onClick={()=>paginate(number)}  className="page-link"
                                  active={number === currentPage ? true : false }
                                >
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