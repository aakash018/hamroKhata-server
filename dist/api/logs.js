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
        return res.send(entries);
    }
}));
exports.default = route;
//# sourceMappingURL=logs.js.map