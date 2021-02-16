"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("../model/payment"));
const payment_calc_1 = require("../util/payment_calc");
const route = express_1.default();
route.post("/", (req, res) => {
    const { amount, paid_by, paid_to } = req.body;
    payment_calc_1.paymentCalc(paid_by, paid_to, amount);
    try {
        const newPayment = new payment_1.default({
            amount: amount,
            paid_by: paid_by,
            paid_to: paid_to
        });
        newPayment.save();
        res.send("Done");
    }
    catch (_a) {
        res.status(500).send("Error Saving Audits");
    }
});
exports.default = route;
//# sourceMappingURL=payment.js.map