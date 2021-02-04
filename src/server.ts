import express from "express"
import mongoose from "mongoose";
import entry from "./api/entry";
import logs from "./api/logs"
import audit from "./api/audit";
import "dotenv/config"

const app = express()
const PORT:number = 5000

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
app.use("/api/audit", audit)

app.listen(PORT, () => {
    console.log("Success")
})
