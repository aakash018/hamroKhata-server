import express from "express"
import mongoose from "mongoose";
import entry from "./api/entry";
import logs from "./api/logs"
import "dotenv/config"

const app = express()

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Database INIT
mongoose.connect(
    "mongodb://localhost/HamroKhata(v2)",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (e) => {
      if (e) {
        console.log("Problem connecting with Database");
      } else {
        console.log("Connected with Mongoose DB");
      }
    }
  );
  

app.use("/api/entry", entry)
app.use("/api/logs", logs)

app.listen(5000, () => {
    console.log("Success")
})
