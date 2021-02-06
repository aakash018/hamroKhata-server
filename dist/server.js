"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const entry_1 = __importDefault(require("./api/entry"));
const logs_1 = __importDefault(require("./api/logs"));
const audit_1 = __importDefault(require("./api/audit"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
dotenv_1.default.config();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
if (process.env.DATABASE_URI) {
    mongoose_1.default.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (e) => {
        if (e) {
            console.log("Problem connecting with Database");
        }
        else {
            console.log("Connected with Mongoose DB");
        }
    });
}
else {
    console.error("Error Loading ENV variables !!! ");
}
app.use("/api/entry", entry_1.default);
app.use("/api/logs", logs_1.default);
app.use("/api/audit", audit_1.default);
app.listen(PORT, () => {
    console.log("Success");
});
//# sourceMappingURL=server.js.map