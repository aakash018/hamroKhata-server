import express from "express"
import { IEntry } from "src/@types/global"
import Logs from "../model/logs"

const route = express()

route.get("/", async (req, res) => {
    const req_position: string = req.query.log_position as unknown as string
    if (req_position == null) {
        // res.setHeader("Access-Control-Allow-Headers", "hamrokhata.netlify.app")
        return res.status(500).send("Error Loding Logs!")
    } else {
        const entries: IEntry[] = await Logs.find().limit(10).skip(parseInt(req_position)).sort({ createdAt: 'desc' }).exec()
        if (entries.length === 0) {
            return res.status(200).send("No Data Found")
        }
        console.log(entries.length)
        return res.send(entries)
    }

})

route.get("/count", async (_, res) => {
    Logs.countDocuments((e, c) => {
        if (e) {
            console.log(e)
        } else {
            res.send(`${c}`)
        }
    })
})

export default route;