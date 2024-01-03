import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
// Mounting the dpendencies
dotenv.config();
app.use(express.json());
app.use(cors())


//Routes

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
