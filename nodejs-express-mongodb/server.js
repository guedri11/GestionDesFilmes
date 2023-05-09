require("dotenv").config();
const express = require("express");
const cors = require("cors");

const userRoutes = require("./app/routes/users.js");
const authRoutes = require("./app/routes/auth.js");

const app = express();
require("./app/routes/filmroutes.js")(app);


// connection db
const db = require("./app/models");
db.mongoose
  .connect("mongodb://127.0.0.1:27017/GestionDesFilmes", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  //cors
var corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your application." });
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});