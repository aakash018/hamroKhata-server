import { IAudit } from "../@types/audit"
import Audit from "../model/audit"

const handleSubstract = (new_amount: number, old_amount: number) => {
    if(new_amount <= old_amount) {
        return old_amount - new_amount
    } else {
        return new_amount - old_amount
    }
}


export const auditCalc = async (payerName:string, amount: number) => {
    // TODO MAKE TOTAL NO OF ROMMIES DYNAMIC
    const total_no_of_rommies = 4;
    let prev_audits: IAudit[] = [];
    prev_audits = await Audit.find() 
    if (prev_audits.length === 0) {
        prev_audits = [ 
            {
                Aakash: {
                    Deekshit: 0,
                    Subash: 0,
                    Yaman: 0,
                },
                Deekshit: {
                    Aakash: 20,
                    Subash: 100,
                    Yaman: 0
                },
                Subash: {
                    Aakash: 0,
                    Deekshit: 0,
                    Yaman: 0  
                },
                Yaman: {
                    Aakash: 0,
                    Deekshit: 20,
                    Subash : 0
                },
            }
        ]
    } 
    // console.log("Amount", amount)
    for(let name_of_roomies in prev_audits[0]) {
        const divied_amount:number = amount / total_no_of_rommies;
        if(name_of_roomies === payerName) {
            const payerAuditInfo: [key: number] = prev_audits[0][name_of_roomies]
            for (const rommie_expect_payer in payerAuditInfo){
                // ! TEST
                let prev_loan_for_payer = payerAuditInfo[rommie_expect_payer];
                if(divied_amount <= prev_loan_for_payer){
                    payerAuditInfo[rommie_expect_payer] =  handleSubstract(divied_amount , prev_loan_for_payer)
                } else {
                    payerAuditInfo[rommie_expect_payer] = 0;
                    prev_audits[0][rommie_expect_payer][payerName] = prev_audits[0][rommie_expect_payer][payerName] + handleSubstract(divied_amount , prev_loan_for_payer)                   
                }
            }
            console.log(prev_audits)
            break;
        }
    }

}