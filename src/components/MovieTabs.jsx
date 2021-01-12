import React from 'react'

class MovieTabs extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.sort_by !== this.props.sort_by) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {sort_by, updateSortBy} = this.props;
        const handleClick = value => () => {
            updateSortBy(value)
        }
        return (
            <ul className="tabs nav nav-pills">
                <li className="nav-item">
                    <div 
                        className={`nav-link ${sort_by === "popularity.desc" ? "active" : ""}`}
                        onClick={handleClick("popularity.desc")}
                    >
                        Popularity desc
                    </div>
                </li>
                <li className="nav-item">
                    <div 
                        className={`nav-link ${sort_by === "revenue.desc" ? "active" : ""}`}
                        onClick={handleClick("revenue.desc")}
                    >
                        Revenue desc
                    </div>
                </li>
                <li className="nav-item">
                    <div 
                        className={`nav-link ${sort_by === "vote_average.desc" ? "active" : ""}`}
                        onClick={handleClick("vote_average.desc")}
                    >
                        Vote average desc
                    </div>
                </li>
            </ul>
        );
    };
}

export default MovieTabs