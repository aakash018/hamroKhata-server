import express from "express"
import { IEntry } from "src/@types/global"
import { EntryAuditCalc } from "../util/Entry_audit_calc"
import Logs from "../model/logs"
import { FrozenAudicCalc } from "../util/frozenAuditCalc"


const router = express()

router.post("/", async (req, res) => {

    const data: IEntry = req.body
    try {
        const name_of_roomies = ["Aakash", "Deekshit", "Subash", "Rohan"]
        const new_entry = new Logs({
            amount: data.amount,
            paid_By: data.paid_by,
            description: data.description,
        })
        await new_entry.save()

        if (data.freeze && data.frozenRoomies) {

            const unfrozenRoomies = name_of_roomies.filter(
                roomie => (
                    !data.frozenRoomies.some(name => name === roomie)
                )
            )

            const audit_calc_data = await FrozenAudicCalc(data.paid_by, data.amount, unfrozenRoomies)

            if (audit_calc_data === "Errro with database") {
                return res.send(audit_calc_data)
            }
            return res.send("Done")
        } else {
            const audit_calc_data = await EntryAuditCalc(data.paid_by, data.amount)

            if (audit_calc_data === "Errro with database") {
                return res.send(audit_calc_data)
            } else {
                return res.send("Done")
            }
        }

    } catch (e) {
        console.log(e)
        return res.send("Error with database at entry")
    }
})

router.get("/", async (_, res) => {
    const data = await Logs.find()
    res.send(data)
})

export default router