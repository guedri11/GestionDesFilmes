module.exports = mongoose => {
  const Film = mongoose.model(
    "film",
    mongoose.Schema(
      {
        title: String,
        year: Number,
        duration: String,
        genre: String,
        director: String,
        actors: String,
        description: String,
        score: Number,
        imageUrl: String, // Add imageUrl property
        published: Boolean
      },
      { timestamps: true }
    )
  );

  return Film;
};





