import express from "express"
import { Entry_Payload } from "src/@types/global"
import Logs from "../model/logs"

const router = express()

router.post("/", async (req,res) => {

    const data:Entry_Payload = req.body
    try {
        const new_entry = new Logs({
            amount: data.amount,
            paid_By: data.paid_by,
            description: data.description,
        })

        await new_entry.save()
        res.send("Done")
    } catch (e) {
        res.send(e.message)
    }
})

router.get("/", async (_,res) => {
    const data = await Logs.find()
    res.send(data)
})

export default router