import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import userRouter from "./Routes/UserRouter.js";
import moviesRouter from "./Routes/MoviesRouter.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import Uploadrouter from "./Controllers/UploadFile.js";
import paymentRouter from "./Routes/paymentRouter.js";

import fs from "fs";
dotenv.config();

const app = express();

const corsConfigPath = "./cors.json";
let corsConfig = [];

try {
  const configFile = fs.readFileSync(corsConfigPath, "utf8");
  corsConfig = JSON.parse(configFile);
} catch (error) {
  console.error("Error reading CORS config file:", error.message);
}
app.use(cors(corsConfig));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});
//connnectDB
connectDB();

//Main route
app.get("/", (req, res) => {
  res.send("API is running...");
});
//other routes
app.use("/api/users", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/upload", Uploadrouter);
app.use("/api/payment", paymentRouter);
//error handling middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
