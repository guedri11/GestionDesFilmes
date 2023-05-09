module.exports = app => {
  const films = require("../controllers/filmcontroller.js");
  const cors = require("cors");
  const router = require("express").Router();

  const corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:3000"]
  };
  router.use(cors(corsOptions));

  // Create a new Film
  router.post("/", films.create);

  // Retrieve all films
  router.get("/", films.findAll);

  // Retrieve all published films
  router.get("/published", films.findAllPublished);

  // Retrieve a single Film with id
  router.get("/:id", films.findOne);

  // Update a Film with id
  router.put("/:id", films.update);

  // Delete a Film with id
  router.delete("/:id", films.delete);

  // Delete all films
  router.delete("/", films.deleteAll);

  app.use('/api/films', router);
};
