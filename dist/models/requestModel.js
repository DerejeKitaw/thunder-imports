"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = exports.defaultCollection = void 0;
const uuid_1 = require("uuid");
exports.defaultCollection = "history";
class RequestModel {
    /**
     * request model object
     * @param url request url
     * @param method http method
     */
    constructor() {
        this.method = "";
        this.url = "";
        this.name = "";
        this.headers = [];
        this.colName = exports.defaultCollection;
        this.colId = exports.defaultCollection;
        this.modified = new Date().toISOString();
        let uid = uuid_1.v4();
        this.id = this._id = uid;
    }
    setId(reqId) {
        this.id = this._id = reqId;
    }
}
exports.RequestModel = RequestModel;
