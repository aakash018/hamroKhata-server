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
const audit_1 = __importDefault(require("../model/audit"));
const route = express_1.default();
route.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prev_audits = yield audit_1.default.find().limit(1).sort({ createdAt: "desc" }).exec();
        if (prev_audits.length === 0) {
            return res.json({ message: "No Data Found" });
        }
        else {
            const object_with_no_id = prev_audits[0].toJSON();
            delete object_with_no_id["_id"];
            delete object_with_no_id["createdAt"];
            delete object_with_no_id["updatedAt"];
            delete object_with_no_id["__v"];
            return res.json(object_with_no_id);
        }
    }
    catch (e) {
        return console.log(e);
    }
}));
exports.default = route;
//# sourceMappingURL=audit.js.map