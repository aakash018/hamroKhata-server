import express from "express"
import Logs from "../model/logs"

const route = express()

route.get("/", async (req,res) => {
    console.log(req.query.log_position)
    const req_position: string = req.query.log_position as unknown as string
    const entries = await Logs.find().sort({currentTime: "desc"}).limit(10).skip(parseInt(req_position)).exec()
    res.send(entries)
})


export default route;