import React, { Component } from "react";
import { connect } from "react-redux";
import { updateFilm, deleteFilm } from "../actions/films";
import FilmDataService from "../services/film.service";

class Film extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getFilm = this.getFilm.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeFilm = this.removeFilm.bind(this);

    this.state = {
      currentFilm: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getFilm(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentFilm: {
          ...prevState.currentFilm,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentFilm: {
        ...prevState.currentFilm,
        description: description,
      },
    }));
  }

  getFilm(id) {
    FilmDataService.get(id)
      .then((response) => {
        this.setState({
          currentFilm: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentFilm.id,
      title: this.state.currentFilm.title,
      description: this.state.currentFilm.description,
      published: status,
    };

    this.props
      .updateFilm(this.state.currentFilm.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentFilm: {
            ...prevState.currentFilm,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateFilm(this.state.currentFilm.id, this.state.currentFilm)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The film was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeFilm() {
    this.props
      .deleteFilm(this.state.currentFilm.id)
      .then(() => {
        this.props.history.push("/films");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentFilm } = this.state;
    return (
      <div>
        {currentFilm ? (
          <div className="edit-form">
            <h4>Film</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentFilm.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentFilm.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentFilm.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentFilm.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeFilm}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Film...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateFilm, deleteFilm })(Film);