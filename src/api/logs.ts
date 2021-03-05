import express from "express"
import { IAudit } from "src/@types/audit"
import { IEntry, ILogs } from "src/@types/global"
import payment from "../model/payment"
import Audit from "../model/audit"
// import audit from "../model/audit"

import Logs from "../model/logs"


const route = express()

route.get("/", async (req, res) => {
    const req_position: string = req.query.log_position as unknown as string
    if (req_position == null) {
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

route.delete("/delete", async (req, res) => {
    const id: string = req.body.id
    const date: Date = req.body.date

    const logsToDelete: ILogs[] = await Logs.find({
        "_id": {
            "$gte": id
        }
    })

    const auditsToDelete: IAudit[] = await Audit.find({
        "createdAt": {
            "$gte": date
        }
    })

    const paymentsToDelete: IAudit[] = await payment.find({
        "createdAt": {
            "$gte": date
        }
    })

    const listOfIdsToDelete: string[] = logsToDelete.map(logs => logs.id)
    await Logs.deleteMany({
        _id: listOfIdsToDelete
    })

    const listOfIdsToDeleteInAudit: string[] = auditsToDelete.map(audit => audit._id)
    await Audit.deleteMany({
        _id: listOfIdsToDeleteInAudit
    })

    const listOfIdsToDeleteInPayment: string[] = paymentsToDelete.map(payment => payment._id)
    await payment.deleteMany({
        _id: listOfIdsToDeleteInPayment
    })

    res.send("Done")

})

route.get("/charts/month", async (_, res) => {
    console.log(new Date().getMonth())

    const logs = await Logs.find({
        "_id": {
            "$lt": "603388795f0edf2d60a7678c",
            "$eq": "603388795f0edf2d60a7678c"
        }
    })
    res.send(logs)
})

export default route;