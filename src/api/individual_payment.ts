import express from "express"
import { IPayment } from "src/@types/global";

const route = express()

route.post("/", (req,res) => {
    const { amount, paid_by, paid_time, paid_to } = req.body as IPayment
    console.log(amount, paid_by, paid_time, paid_to)
    res.send("Done")
})

export default route;