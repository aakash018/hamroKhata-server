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
const Entry_audit_calc_1 = require("../util/Entry_audit_calc");
const logs_1 = __importDefault(require("../model/logs"));
const frozenAuditCalc_1 = require("../util/frozenAuditCalc");
const router = express_1.default();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const name_of_roomies = ["Aakash", "Deekshit", "Subash", "Rohan"];
        const new_entry = new logs_1.default({
            amount: data.amount,
            paid_By: data.paid_by,
            description: data.description,
        });
        yield new_entry.save();
        if (data.freeze && data.frozenRoomies) {
            const unfrozenRoomies = name_of_roomies.filter(roomie => (!data.frozenRoomies.some(name => name === roomie)));
            const audit_calc_data = yield frozenAuditCalc_1.FrozenAudicCalc(data.paid_by, data.amount, unfrozenRoomies);
            if (audit_calc_data === "Errro with database") {
                return res.send(audit_calc_data);
            }
            return res.send("Done");
        }
        else {
            const audit_calc_data = yield Entry_audit_calc_1.EntryAuditCalc(data.paid_by, data.amount);
            if (audit_calc_data === "Errro with database") {
                return res.send(audit_calc_data);
            }
            else {
                return res.send("Done");
            }
        }
    }
    catch (e) {
        console.log(e);
        return res.send("Error with database at entry");
    }
}));
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield logs_1.default.find();
    res.send(data);
}));
exports.default = router;
//# sourceMappingURL=entry.js.map