"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.TelephoneSchema = new Schema({
    telCrypted: { type: String, required: true }
});
// Export the model and return your ITelephoneModel interface
exports.Telephone = mongoose_1.default.model("telephone", exports.TelephoneSchema, "Telephone");
//# sourceMappingURL=telephoneDB.js.map