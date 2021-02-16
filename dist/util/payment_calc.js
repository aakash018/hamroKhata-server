"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentCalc = void 0;
const audit_1 = __importDefault(require("../model/audit"));
const auditCalculatons_1 = require("./auditCalculatons");
const paymentCalc = (payerName, paidTo, amount) => __awaiter(void 0, void 0, void 0, function* () {
    let prev_audits = [];
    try {
        prev_audits = yield audit_1.default.find().sort({ createdAt: "desc" }).limit(1).exec();
    }
    catch (e) {
        console.log("Audit DataBase Error", e);
        return ("Errro with database");
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
        ];
    }
    const payerAuditInfo = prev_audits[0][payerName];
    console.log("Audit Info", payerAuditInfo);
    auditCalculatons_1.auditCaculations(payerAuditInfo, paidTo, prev_audits, amount, payerName);
    console.log(prev_audits);
    let object_with_no_id = prev_audits[0];
    if (prev_audits[0]["_id"] != null) {
        object_with_no_id = prev_audits[0].toJSON();
        delete object_with_no_id["_id"];
        delete object_with_no_id["createdAt"];
        delete object_with_no_id["updatedAt"];
        delete object_with_no_id["__v"];
    }
    const newAudit = new audit_1.default(object_with_no_id);
    try {
        yield newAudit.save();
    }
    catch (e) {
        console.log(e);
    }
    return prev_audits[0];
});
exports.paymentCalc = paymentCalc;
//# sourceMappingURL=payment_calc.js.map