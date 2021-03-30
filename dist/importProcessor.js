"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportProcessor = void 0;
const registerProviders_1 = __importDefault(require("./registerProviders"));
class ImportProcessor {
    constructor() {
        this._imports = registerProviders_1.default.getProviders();
    }
    findMatchCollection(json) {
        for (const item of this._imports) {
            if (item.isMatchCollection(json)) {
                return item;
            }
        }
        return undefined;
    }
    findMatchEnvironment(json) {
        for (const item of this._imports) {
            if (item.isMatchEnvironment(json)) {
                return item;
            }
        }
        return undefined;
    }
    importCollection(json) {
        var match = this.findMatchCollection(json);
        if (!match) {
            return undefined;
        }
        return match.importCollection(json);
    }
    importEnvironemnt(json) {
        var match = this.findMatchEnvironment(json);
        if (!match) {
            return undefined;
        }
        return match.importEnvironment(json);
    }
}
exports.ImportProcessor = ImportProcessor;
