import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    userImage: { type: String },
    rating: { type: Number, require: true },
    comment: { type: String, require: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);

const moviesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    video: {
      require: true,
      type: String
    },
    time: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewsSchema],
    casts: [
      {
        name: { type: String, require: true },
        image: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movies", moviesSchema);
