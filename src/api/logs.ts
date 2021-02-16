import express from "express"
import Logs from "../model/logs"

const route = express()

route.get("/", async (req, res) => {
    const req_position: string = req.query.log_position as unknown as string
    if (req_position == null) {
        // res.setHeader("Access-Control-Allow-Headers", "hamrokhata.netlify.app")
        return res.status(500).send("Error Loding Logs!")
    } else {
        const entries = await Logs.find().limit(10).skip(parseInt(req_position)).sort({ createdAt: 'desc' }).exec()
        if (entries.length === 0) {
            return res.status(200).send("No Data Found")
        }
        // res.setHeader("Access-Control-Allow-Headers", "hamrokhata.netlify.app")
        return res.send(entries)
    }

})

route.get("/count", async (_, res) => {
    Logs.countDocuments((e, c) => {
        if (e) {
            res.send(e)
        } else {
            res.send(`${c}`)
        }
    })
})

export default route;