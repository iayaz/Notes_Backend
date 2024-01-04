import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import protectedRoutes from "./routes/protectedRoutes.js"
// Mounting the dpendencies
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use('/api',protectedRoutes);

// DB setup
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(PORT, () => {
      console.log(`server is up and running on ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(`${error} did not connect`);
  });
