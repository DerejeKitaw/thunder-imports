"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postmanImport_1 = __importDefault(require("./providers/postmanImport"));
const thunderImport_1 = __importDefault(require("./providers/thunderImport"));
class RegisterProviders {
    static getProviders() {
        var providers = [];
        providers.push(new thunderImport_1.default());
        providers.push(new postmanImport_1.default());
        return providers;
    }
}
exports.default = RegisterProviders;
