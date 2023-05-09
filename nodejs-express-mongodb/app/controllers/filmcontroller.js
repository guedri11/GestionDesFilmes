const db = require("../models");
const Film = db.Film;

// Create and Save a new Film
exports.create = (req, res) => {
     // Validate request
     // console.log('Film model:', req.body);
  if (!req.body.title) {
    res.status(400).send({ message: "Title can not be empty!" });
    return;
  }
  // Create a Film
  const film = new Film({
    title: req.body.title,
    year: req.body.year,
    duration: req.body.duration,
    genre: req.body.genre,
    director: req.body.director,
    actors: req.body.actors,
    description: req.body.description,
    score: req.body.score,
    imageUrl: req.body.imageUrl,
    published: req.body.published ? req.body.published : false
  });

  
  // Save Film in the database
  film
    .save(film)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Film."
      });
    });

};

// Retrieve all Films from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Film.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving films."
      });
    });

};

// Find a single Film with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Film.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Film not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Film with id=" + id });
    });

};

// Update a Film by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Film.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Film with id=${id}. Maybe Film was not found!`
            });
          } else res.send({ message: "Film was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Film with id=" + id
          });
        });

};

// Delete a Film with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Film.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Film with id=${id}. Maybe Film was not found!`
        });
      } else {
        res.send({
          message: "Film was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Film with id=" + id
      });
    });

};

// Delete all Films from the database.
exports.deleteAll = (req, res) => {
    Film.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Films were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all films."
      });
    });

};

// Find all published Films
exports.findAllPublished = (req, res) => {
    Film.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving films."
      });
    });

};