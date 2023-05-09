import React, { Component } from "react";
import { connect } from "react-redux";
import { createFilm } from "../actions/films";

class AddFilm extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
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

  saveFilm() {
    const { title, description } = this.state;

    this.props
      .createFilm(title, description)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
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
      description: "",
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
            <br></br>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={this.saveFilm} className="btn btn-success">
                Submit
              </button>

              <button onClick={this.saveFilm} className="btn btn-info">
                Go Back
              </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createFilm })(AddFilm);