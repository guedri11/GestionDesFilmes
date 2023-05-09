import React, { Component } from "react";
import { connect } from "react-redux";
import { createFilm } from "../actions/films";
import { Link } from "react-router-dom";

class AddFilm extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeScore = this.onChangeScore.bind(this);
    this.onChangePublished = this.onChangePublished.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeActors = this.onChangeActors.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.saveFilm = this.saveFilm.bind(this);
    this.newFilm = this.newFilm.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      duration: "",
      genre: "",
      director: "",
      year: 0,
      actors: "",
      score: 0,
      imageUrl: "",
      published: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeScore(e) {
    this.setState({
      score: e.target.value
    });
  }

  onChangePublished(e) {
    this.setState({
      published: e.target.value === "true" ? true : false,
    });
  }

  onChangeDirector(e) {
    this.setState({
      director: e.target.value,
    });
  }

  onChangeActors(e) {
    this.setState({
      actors: e.target.value,
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value,
    });
  }

  saveFilm() {
    const { title, year, duration, genre, director, actors, description, score, imageUrl, published } = this.state;

    this.props
      .createFilm(title, year, duration, genre, director, actors, description, score, imageUrl, published)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          year: data.year,
          duration: data.duration,
          genre: data.genre,
          director: data.director,
          actors: data.actors,
          description: data.description,
          score: data.score,
          imageUrl: data.imageUrl,
          published: data.published,
          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newFilm() {
    this.setState({
      id: null,
      title: "",
      year: "",
      duration: "",
      genre: "",
      director: "",
      actors: "",
      description: "",
      score: "",
      imageUrl: "",
      published: false,
      submitted: false,
    });
  }

  render() {
    return (
        <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newFilm}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
  <label htmlFor="year">Year</label>
  <select className="form-control" id="year" onChange={this.onChangeYear} value={this.state.year}>
    {[...Array(124)].map((_, i) => {
      const year = 2023 - i;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
</div>

            <div className="form-group">
              <label htmlFor="duration">Duration</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                required
                value={this.state.duration}
                onChange={this.onChangeDuration}
                name="duration"
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                required
                value={this.state.genre}
                onChange={this.onChangeGenre}
                name="genre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="actors">Actors</label>
              <input
                type="text"
                className="form-control"
                id="actors"
                required
                value={this.state.actors}
                onChange={this.onChangeActors}
                name="actors"
              />
            </div>

            <div className="form-group">
              <label htmlFor="director">Director</label>
              <input
                type="text"
                className="form-control"
                id="director"
                required
                value={this.state.director}
                onChange={this.onChangeDirector}
                name="director"
              />
            </div>

            <div className="form-group">
  <label htmlFor="score">Score</label>
  <input
    type="number"
    className="form-control"
    id="score"
    required
    value={this.state.score}
    onChange={this.onChangeScore}
    name="score"
    step="0.1"
    min="1"
    max="10"
  />
</div>

            
            <div className="form-group">
            <label htmlFor="published">Published</label>
              <select
              className="form-control"
              id="published"
              required
              value={this.state.published}
              onChange={this.onChangePublished}
              name="published"
              >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
        </div>
    
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.saveFilm} className="btn btn-success">
                Submit
              </button>

              <Link to={"/films"} className="nav-link">
              <button onClick={this.saveFilm} className="btn btn-info">
                Go Back
              </button>
              </Link>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createFilm })(AddFilm);