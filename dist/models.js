"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvironmentImportModel = exports.CollectionImportModel = void 0;
class CollectionImportModel {
    constructor() {
        /**
         * Collection Name
         */
        this.name = "";
        this.requests = [];
    }
}
exports.CollectionImportModel = CollectionImportModel;
class EnvironmentImportModel {
    constructor() {
        /**
         * Environment Name
         */
        this.name = "";
        this.variables = [];
    }
}
exports.EnvironmentImportModel = EnvironmentImportModel;
