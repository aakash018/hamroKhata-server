"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auditCaculations = void 0;
const handleSubstract = (new_amount, old_amount) => {
    if (new_amount <= old_amount) {
        return old_amount - new_amount;
    }
    else {
        return new_amount - old_amount;
    }
};
const auditCaculations = (payerAuditInfo, rommie_expect_payer, prev_audits, divied_amount, payerName) => {
    let prev_loan_for_payer = payerAuditInfo[rommie_expect_payer];
    if (divied_amount <= prev_loan_for_payer) {
        payerAuditInfo[rommie_expect_payer] = handleSubstract(divied_amount, prev_loan_for_payer);
    }
    else {
        payerAuditInfo[rommie_expect_payer] = 0;
        prev_audits[0][rommie_expect_payer][payerName] = prev_audits[0][rommie_expect_payer][payerName] + handleSubstract(divied_amount, prev_loan_for_payer);
    }
};
exports.auditCaculations = auditCaculations;
//# sourceMappingURL=auditCalculatons.js.map