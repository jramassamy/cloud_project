"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.MessageSchema = new Schema({
    name: String,
    mail: String,
    tel: String,
    message: String
});
// Export the model and return your IUser interface
exports.Message = mongoose_1.default.model("message", exports.MessageSchema, "Message");
//# sourceMappingURL=messageDB.js.map