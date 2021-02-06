import express from "express"
import mongoose from "mongoose";
import entry from "./api/entry";
import logs from "./api/logs"
import audit from "./api/audit";
import dotenv from "dotenv"

const app = express()
const PORT:string|number = process.env.PORT || 5000;

// ENV init
dotenv.config()

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Database INIT
if(process.env.DATABASE_URI){

  mongoose.connect(
      process.env.DATABASE_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (e) => {
        if (e) {
          console.log("Problem connecting with Database", e);
        } else {
          console.log("Connected with Mongoose DB");
        }
      }
    );
} else {
  console.error("Error Loading ENV variables !!! ")
}
  

app.use("/api/entry", entry)
app.use("/api/logs", logs)
app.use("/api/audit", audit)

app.listen(PORT, () => {
    console.log("Success")
})
