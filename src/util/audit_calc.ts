import { IAudit } from "../@types/audit"
import Audit from "../model/audit"
import { auditCaculations } from "./auditCalculatons"




export const auditCalc = async (payerName: string, amount: number) => {
    const total_no_of_rommies = 4;

    // ? To iterate if no collection existed and an TS object was made as it doesn't need .toJSON()
    let isMongooseObj = true;

    let prev_audits: IAudit[] | any = [];
    try {
        prev_audits = await Audit.find().sort({ createdAt: "desc" }).limit(1).exec()
    } catch (e) {
        console.log("Audit DataBase Error", e)
        return ("Errro with database")
    }
    if (prev_audits.length === 0) {
        isMongooseObj = false
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


    if (isMongooseObj) {
        for (let name_of_paid_roomies in prev_audits[0].toJSON()) {
            const divied_amount: number = amount / total_no_of_rommies;
            if (name_of_paid_roomies === payerName) {
                const payerAuditInfo: [key: number] | any = prev_audits[0][name_of_paid_roomies]
                // console.log("Audit", typeof payerAuditInfo)

                for (let rommie_expect_payer in payerAuditInfo.toJSON()) {
                    // ? Audit Algogrithm

                    auditCaculations(
                        payerAuditInfo,
                        rommie_expect_payer,
                        prev_audits, divied_amount,
                        payerName
                    )
                }
                break;
            }
        }
    } else {
        for (let name_of_roomies in prev_audits[0]) {
            console.log(name_of_roomies)
            const divied_amount: number = amount / total_no_of_rommies;
            if (name_of_roomies === payerName) {
                const payerAuditInfo: [key: number] | any = prev_audits[0][name_of_roomies]
                // console.log("Audit", typeof payerAuditInfo)

                for (let rommie_expect_payer in payerAuditInfo) {
                    console.log("Roomie", typeof rommie_expect_payer)
                    // ! TEST
                    auditCaculations(
                        payerAuditInfo,
                        rommie_expect_payer,
                        prev_audits,
                        divied_amount,
                        payerName
                    )
                }
                break;
            }
        }

        //? For Next Entry
        isMongooseObj = true
    }

    // ? Id is removed from object to not dublicate the id in mongoose
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