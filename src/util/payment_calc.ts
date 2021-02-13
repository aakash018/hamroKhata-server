import { IAudit } from "src/@types/audit";
import Audit from "../model/audit";
import { auditCaculations } from "./auditCalculatons";

export const paymentCalc = async (payerName: string, paidTo: string, amount: number) => {

    let prev_audits: IAudit[] | any = [];
    try {
        prev_audits = await Audit.find().sort({ createdAt: "desc" }).limit(1).exec()
    } catch (e) {
        console.log("Audit DataBase Error", e)
        return ("Errro with database")
    }
    if (prev_audits.length === 0) {
        prev_audits = [
            {
                Aakash: {
                    Deekshit: 0,
                    Subash: 0,
                    Yaman: 0,
                },
                Deekshit: {
                    Aakash: 0,
                    Subash: 0,
                    Yaman: 0
                },
                Subash: {
                    Aakash: 0,
                    Deekshit: 0,
                    Yaman: 0
                },
                Yaman: {
                    Aakash: 0,
                    Deekshit: 0,
                    Subash: 0
                },
            }
        ]
    }


    const payerAuditInfo: [key: number] | any = prev_audits[0][payerName]
    console.log("Audit Info", payerAuditInfo)
    auditCaculations(
        payerAuditInfo,
        paidTo,
        prev_audits,
        amount,
        payerName
    )

    console.log(prev_audits)

    let object_with_no_id = prev_audits[0];
    if (prev_audits[0]["_id"] != null) {
        object_with_no_id = prev_audits[0].toJSON();
        delete object_with_no_id["_id"]
        delete object_with_no_id["createdAt"]
        delete object_with_no_id["updatedAt"]
        delete object_with_no_id["__v"]
    }
    const newAudit = new Audit(object_with_no_id)
    try {
        await newAudit.save()
    } catch (e) {
        console.log(e)
    }

    return prev_audits[0]

}