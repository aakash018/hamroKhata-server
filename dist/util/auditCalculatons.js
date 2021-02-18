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
const auditCaculations = (payerAuditInfo, paid_to, prev_audits, divied_amount, payerName) => {
    let prev_loan_for_payer = payerAuditInfo[paid_to];
    divied_amount = parseFloat(divied_amount.toFixed(2));
    if (divied_amount <= prev_loan_for_payer) {
        payerAuditInfo[paid_to] = handleSubstract(divied_amount, prev_loan_for_payer);
    }
    else {
        payerAuditInfo[paid_to] = 0;
        prev_audits[0][paid_to][payerName] = prev_audits[0][paid_to][payerName] + handleSubstract(divied_amount, prev_loan_for_payer);
    }
};
exports.auditCaculations = auditCaculations;
//# sourceMappingURL=auditCalculatons.js.map