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
    
    // ? To iterate if no collection existed and an TS object was made as it doesn't need .toJSON()
    let isMongooseObj = true;

    let prev_audits: IAudit[] | any = [];
    prev_audits = await Audit.find().sort({ createdAt: "desc"}).limit(1).exec() 
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
                    Subash : 0
                },
            }
        ]
    } 


    if(isMongooseObj){
        for(let name_of_roomies in prev_audits[0].toJSON()) {
            const divied_amount:number = amount / total_no_of_rommies;
            if(name_of_roomies === payerName) {
                const payerAuditInfo: [key: number] | any = prev_audits[0][name_of_roomies]
                // console.log("Audit", typeof payerAuditInfo)
    
                for (let rommie_expect_payer in payerAuditInfo.toJSON()){
                    // ? Audit Algogrithm
                    let prev_loan_for_payer = payerAuditInfo[rommie_expect_payer];
                    if(divied_amount <= prev_loan_for_payer){
                        // ? Run if payer doesn'tpay complete lona with the resp. roomie
                        // ? Just Sub the prev loan with recently paid amount
                        payerAuditInfo[rommie_expect_payer] =  handleSubstract(divied_amount , prev_loan_for_payer)
                    } else {
                        // ? Only run if payer pays complete loan to resp. rommie
                        // ? Zero to loan paid by payer
                        payerAuditInfo[rommie_expect_payer] = 0;
                        
                        // ? Add the remaining money to the respective rommie
                        prev_audits[0][rommie_expect_payer][payerName] = prev_audits[0][rommie_expect_payer][payerName] + handleSubstract(divied_amount , prev_loan_for_payer)                   
                    }
                }
                break;
            }
        }
    } else {
        for(let name_of_roomies in prev_audits[0]) {
            console.log(name_of_roomies)
            const divied_amount:number = amount / total_no_of_rommies;
            if(name_of_roomies === payerName) {
                const payerAuditInfo: [key: number] | any = prev_audits[0][name_of_roomies]
                // console.log("Audit", typeof payerAuditInfo)
    
                for (let rommie_expect_payer in payerAuditInfo){
                    console.log("Roomie" , typeof rommie_expect_payer)
                    // ! TEST
                    let prev_loan_for_payer = payerAuditInfo[rommie_expect_payer];
                    if(divied_amount <= prev_loan_for_payer){
                        // ? Run if payer doesn'tpay complete lona with the resp. roomie
                        // ? Just Sub the prev loan with recently paid amount
                        payerAuditInfo[rommie_expect_payer] =  handleSubstract(divied_amount , prev_loan_for_payer)
                    } else {
                        // ? Only run if payer pays complete loan to resp. rommie
                        // ? Zero to loan paid by payer
                        payerAuditInfo[rommie_expect_payer] = 0;
                        
                        // ? Add the remaining money to the respective rommie
                        prev_audits[0][rommie_expect_payer][payerName] = prev_audits[0][rommie_expect_payer][payerName] + handleSubstract(divied_amount , prev_loan_for_payer)                   
                    }
                }
                break;
            }
        }

        //? For Next Entry
        isMongooseObj = true
    }
    
    // ? Id is removed from object to not dublicate the id in mongoose

    let object_with_no_id = prev_audits[0];
    if(prev_audits[0]["_id"] != null){
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