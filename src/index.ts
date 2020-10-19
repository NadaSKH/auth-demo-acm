import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  console.log("HEYY");
  res.send("HELLO PEOPLE");
});

mongoose.connect(
  process.env.DB_CONNECT || "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => console.log("Connected to database")
);

app.listen(3000, () => console.log("SERVER IS UP AND RUNNING"));
