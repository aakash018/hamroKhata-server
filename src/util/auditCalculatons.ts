
const handleSubstract = (new_amount: number, old_amount: number) => {
    if (new_amount <= old_amount) {
        return old_amount - new_amount
    } else {
        return new_amount - old_amount
    }
}



export const auditCaculations = (payerAuditInfo: any[],
    rommie_expect_payer: any, prev_audits: any[],
    divied_amount: number,
    payerName: string) => {

    let prev_loan_for_payer = payerAuditInfo[rommie_expect_payer];
    if (divied_amount <= prev_loan_for_payer) {
        // ? Run if payer doesn'tpay complete lona with the resp. roomie
        // ? Just Sub the prev loan with recently paid amount
        payerAuditInfo[rommie_expect_payer] = handleSubstract(divied_amount, prev_loan_for_payer)
    } else {
        // ? Only run if payer pays complete loan to resp. rommie
        // ? Zero to loan paid by payer
        payerAuditInfo[rommie_expect_payer] = 0;

        // ? Add the remaining money to the respective rommie
        prev_audits[0][rommie_expect_payer][payerName] = prev_audits[0][rommie_expect_payer][payerName] + handleSubstract(divied_amount, prev_loan_for_payer)
    }
}