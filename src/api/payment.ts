import express from "express"
import { IPayment } from "src/@types/global";
import Payment from "../model/payment";
import { paymentCalc } from "../util/payment_calc";

const route = express()

route.post("/", (req, res) => {
    const { amount, paid_by, paid_to } = req.body as IPayment
    paymentCalc(paid_by, paid_to, amount)
    try {
        const newPayment = new Payment({
            amount: amount,
            paid_by: paid_by,
            paid_to: paid_to
        })
        newPayment.save()
        res.send("Done")
    } catch {
        res.status(500).send("Error Saving Audits")
    }
})

export default route;