import express from "express"
import mongoose from "mongoose";
import entry from "./api/entry";
import logs from "./api/logs"
import audit from "./api/audit";
import individual_payment from "./api/payment"
import dotenv from "dotenv"
import cors from "cors"

const app = express()
const PORT: string | number = process.env.PORT || 5000;

// ENV init
dotenv.config()

//CORS middleware
app.use(cors())

//Parser MiddleWare
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

//Database INIT
if (process.env.DATABASE_URI) {

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


app.get("/", (_, res) => {
  res.send("Server is running !!!!")
})

app.use("/api/entry", entry)
app.use("/api/logs", logs)
app.use("/api/audit", audit)
app.use("/api/payment", individual_payment)

app.listen(PORT, () => {
  console.log("Running at", PORT)
})
