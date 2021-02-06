import express from "express";
import { IAuditDatabase } from "src/@types/audit";
import Audit from "../model/audit";

const route = express()

route.get("/", async (_,res) => {

    try {
        const prev_audits: IAuditDatabase[] = await Audit.find().limit(1).sort({ createdAt: "desc"}).exec()
        if(prev_audits.length === 0){
            res.setHeader("Access-Control-Allow-Headers", "hamrokhata.netlify.app")
            return res.json({message: "No Data Found"})
        } else {
            const object_with_no_id = prev_audits[0].toJSON()
            delete object_with_no_id["_id"]
            delete object_with_no_id["createdAt"]
            delete object_with_no_id["updatedAt"]
            delete object_with_no_id["__v"]
            res.setHeader("Access-Control-Allow-Headers", "hamrokhata.netlify.app")
            return res.json(object_with_no_id)
        }
    } catch (e) {
        return console.log(e)
    }


})

export default route