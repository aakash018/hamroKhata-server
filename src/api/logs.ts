import express from "express"
import Logs from "../model/logs"

const route = express()

route.get("/", async (req,res) => {
    const req_position: string = req.query.log_position as unknown as string
    console.log(req_position)
    if(req_position == null){
        return res.status(500).send("Error Loding Logs!")
    } else {
        const entries = await Logs.find().limit(10).skip(parseInt(req_position)).sort({ createdAt: 'desc'}).exec()
        if(entries.length === 0) {
            return res.status(200).send("No Data Found")
        }
        return res.send(entries)
    }
    
})


export default route;