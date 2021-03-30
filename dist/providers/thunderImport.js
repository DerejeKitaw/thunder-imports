"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionImportModel_1 = require("../models/collectionImportModel");
const __1 = require("..");
class ThunderImport {
    isMatchCollection(json) {
        if (json.client && json.client.includes("Thunder Client") && json.collectionName) {
            return true;
        }
        return false;
    }
    importCollection(json) {
        var data = new collectionImportModel_1.CollectionImportModel();
        data.name = json.collectionName;
        data.requests = json.requests;
        return data;
    }
    isMatchEnvironment(json) {
        if (json.client && json.client.includes("Thunder Client") && json.environmentName) {
            return true;
        }
        return false;
    }
    importEnvironment(json) {
        var data = new __1.EnvironmentImportModel();
        data.name = json.environmentName;
        data.variables = json.variables;
        return data;
    }
}
exports.default = ThunderImport;
