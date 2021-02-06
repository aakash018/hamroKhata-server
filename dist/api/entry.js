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
const express_1 = __importDefault(require("express"));
const audit_calc_1 = require("../util/audit_calc");
const logs_1 = __importDefault(require("../model/logs"));
const router = express_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const new_entry = new logs_1.default({
            amount: data.amount,
            paid_By: data.paid_by,
            description: data.description,
        });
        yield audit_calc_1.auditCalc(data.paid_by, data.amount);
        yield new_entry.save();
        res.send("Done");
    }
    catch (e) {
        res.send(e.message);
    }
}));
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield logs_1.default.find();
    res.send(data);
}));
exports.default = router;
//# sourceMappingURL=entry.js.map