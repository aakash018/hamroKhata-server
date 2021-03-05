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
const payment_1 = __importDefault(require("../model/payment"));
const audit_1 = __importDefault(require("../model/audit"));
const logs_1 = __importDefault(require("../model/logs"));
const route = express_1.default();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const req_position = req.query.log_position;
    if (req_position == null) {
        return res.status(500).send("Error Loding Logs!");
    }
    else {
        const entries = yield logs_1.default.find().limit(10).skip(parseInt(req_position)).sort({ createdAt: 'desc' }).exec();
        if (entries.length === 0) {
            return res.status(200).send("No Data Found");
        }
        console.log(entries.length);
        return res.send(entries);
    }
}));
route.get("/count", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    logs_1.default.countDocuments((e, c) => {
        if (e) {
            console.log(e);
        }
        else {
            res.send(`${c}`);
        }
    });
}));
route.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const date = req.body.date;
    if (id == null || date == null)
        throw "params missing";
    try {
        const logsToDelete = yield logs_1.default.find({
            "_id": {
                "$gte": id
            }
        });
        const auditsToDelete = yield audit_1.default.find({
            "createdAt": {
                "$gte": date
            }
        });
        const paymentsToDelete = yield payment_1.default.find({
            "createdAt": {
                "$gte": date
            }
        });
        const listOfIdsToDelete = logsToDelete.map(logs => logs.id);
        yield logs_1.default.deleteMany({
            _id: listOfIdsToDelete
        });
        const listOfIdsToDeleteInAudit = auditsToDelete.map(audit => audit._id);
        yield audit_1.default.deleteMany({
            _id: listOfIdsToDeleteInAudit
        });
        const listOfIdsToDeleteInPayment = paymentsToDelete.map(payment => payment._id);
        yield payment_1.default.deleteMany({
            _id: listOfIdsToDeleteInPayment
        });
        res.send("Done");
    }
    catch (e) {
        console.log(e);
        res.status(505).send("Error Deleting");
    }
}));
route.get("/charts/month", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(new Date().getMonth());
    const logs = yield logs_1.default.find({
        "_id": {
            "$lt": "603388795f0edf2d60a7678c",
            "$eq": "603388795f0edf2d60a7678c"
        }
    });
    res.send(logs);
}));
exports.default = route;
//# sourceMappingURL=logs.js.map