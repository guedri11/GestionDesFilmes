import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveFilms, findFilmsByTitle, deleteAllFilms } from "../actions/films";
import { Link } from "react-router-dom";

class FilmsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveFilm = this.setActiveFilm.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllFilms = this.removeAllFilms.bind(this);

    this.state = {
      currentFilm: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveFilms();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentFilm: null,
      currentIndex: -1,
    });
  }

  setActiveFilm(film, index) {
    this.setState({
      currentFilm: film,
      currentIndex: index,
    });
  }

  removeAllFilms() {
    this.props
      .deleteAllFilms()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findFilmsByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentFilm, currentIndex } = this.state;
    const { films } = this.props;

    return (
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Films List</h4>

          <ul className="list-group">
            {films &&
              films.map((film, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveFilm(film, index)}
                  key={index}
                >
                  {film.title}
                </li>
              ))}
          </ul>

          <div className="d-flex">
          <button
            className="m-3 btn btn-sm btn-danger mr-2"
            onClick={this.removeAllFilms}>
            Remove All
          </button>
          <Link to={"/add"} className="nav-link">
          <button
            className="m-3 btn btn-sm btn-success">
            Add Film
          </button>
          </Link>
          </div>
        </div>
        <div className="col-md-6">
          {currentFilm ? (
            <div>
              <h4>Film</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentFilm.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentFilm.description}
              </div>
              <div>
                <label>
                  <strong>Year:</strong>
                </label>{" "}
                {currentFilm.year}
              </div>
              <div>
                <label>
                  <strong>Duration:</strong>
                </label>{" "}
                {currentFilm.duration}
              </div>
              <div>
                <label>
                  <strong>Genre:</strong>
                </label>{" "}
                {currentFilm.genre}
              </div>
              <div>
                <label>
                  <strong>Actors:</strong>
                </label>{" "}
                {currentFilm.actors}
              </div>
              <div>
                <label>
                  <strong>Director:</strong>
                </label>{" "}
                {currentFilm.director}
              </div>
              <div>
                <label>
                  <strong>Score:</strong>
                </label>{" "}
                {currentFilm.score}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentFilm.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/films/" + currentFilm.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Film...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    films: state.films,
  };
};

export default connect(mapStateToProps, { retrieveFilms, findFilmsByTitle, deleteAllFilms })(FilmsList);