import React from "react";
import moviesData from "../moviesData";
import MovieItem from "./MovieItem"
import MovieTabs from "./MovieTabs"
import Pagination from "./Pagination";

console.log(moviesData);

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: moviesData,
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      pageNumber: 1,
      totalPages: 1
    }
  }
  
  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevState.sort_by === this.state.sort_by) {
    //   this.getMovies();
    // }
    if (prevState.sort_by !== this.state.sort_by || prevState.pageNumber !== this.state.pageNumber) {
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=3f4ca4f3a9750da53450646ced312397&sort_by=${this.state.sort_by}&page=${this.state.pageNumber}`).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        movies: data.results,
        pageNumber: data.page,
        totalPages: data.total_pages
      })
    });
  }

  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(function(item){
      return item.id !== movie.id;
    })
  
    console.log(updateMovies);
  
    this.setState({
      movies: updateMovies
    })
  }

  addMovieToWillWatch = movie => {
    console.log(movie);
    const moviesWillWatch = [...this.state.moviesWillWatch, movie];
    
    this.setState({
      moviesWillWatch: moviesWillWatch
    })
  }

  removeMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(function(item){
      return item.id !== movie.id;
    })
  
    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    })
  }

  updateSortBy = value => {
    this.setState({
      sort_by: value
    })
  }

  changePageNumber = (boolean) => {
    if (boolean === true && this.state.pageNumber < 1000) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      })
    } else if (boolean === false && this.state.pageNumber > 1) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      })
    }
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs sort_by={this.state.sort_by} updateSortBy={this.updateSortBy}/>
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id} >
                    <MovieItem 
                      addMovieToWillWatch = {this.addMovieToWillWatch}
                      movie={movie} 
                      removeMovie={this.removeMovie}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
            <Pagination changePageNumber={this.changePageNumber} />
          </div>
          <div className="col-3">
            <p>Will Watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
    ); 
  }
}

export default App;
