import React from "react"

const Pagination = ({ ROWS_PER_PAGE, totalArticles, pagination }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalArticles / ROWS_PER_PAGE); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
            <nav aria-label="Пример навигации по страницам">
              <ul className="pagination justify-content-center">
                    {
                        pageNumbers.map(number => (
                            <li className="page-item"  key={number}>
                                <a className="page-link" href="#" onClick={() =>pagination(number) }>
                                    {number}
                                </a>
                            </li>
                        ))
                    }
              </ul>
            </nav>
        </div>
    )
};

export default Pagination;
