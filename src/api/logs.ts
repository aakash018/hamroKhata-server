import express from "express"
import Logs from "../model/logs"

const route = express()

route.get("/", async (_,res) => {
    const entries = await Logs.find()
    res.send(entries)
})


export default route;