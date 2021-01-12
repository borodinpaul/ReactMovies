import React from 'react'

class Pagination extends React.Component {
    render() {
        const { changePageNumber } = this.props;
        const handleClick = value => () => {
            changePageNumber(value);
        }
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li 
                        className="page-item" 
                        onClick={handleClick(false)}
                    ><a className="page-link" href="#">Previous</a></li>
                    <li 
                        className="page-item"
                        onClick={handleClick(true)}
                    ><a className="page-link" href="#">Next</a></li>
                </ul>
          </nav>
        );
    };
}

export default Pagination;