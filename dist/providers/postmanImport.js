"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collectionImportModel_1 = require("../models/collectionImportModel");
const requestImportModel_1 = require("../models/requestImportModel");
const __1 = require("..");
class PostmanImport {
    isMatchEnvironment(json) {
        if (json.name
            && json._postman_variable_scope === "environment"
            && json._postman_exported_using.includes("Postman")) {
            return true;
        }
        return false;
    }
    importEnvironment(json) {
        var data = new __1.EnvironmentImportModel();
        data.name = json.name;
        let variables = [];
        for (const item of json.values) {
            variables.push({ name: item.key, value: item.value });
        }
        data.variables = variables;
        return data;
    }
    isMatchCollection(json) {
        if (json.info && json.info.schema
            && json.info.schema.includes("postman")
            && json.info.schema.includes("v2.1.0")) {
            return true;
        }
        return false;
    }
    importCollection(json) {
        var data = new collectionImportModel_1.CollectionImportModel();
        data.name = json.info.name;
        var tcRequests = [];
        this.parseData(json, tcRequests);
        data.requests = tcRequests;
        return data;
    }
    parseData(jsonData, tcRequests) {
        let item = jsonData.item;
        if (item && item.length > 0) {
            // console.log("postman collection: ", item)
            for (let colItem of item) {
                if (colItem.request) {
                    var req = this.parseRequest(colItem);
                    tcRequests.push(req);
                }
                else if (colItem.item) {
                    this.parseData(colItem, tcRequests);
                }
            }
        }
    }
    parseRequest(requestItem) {
        var _a;
        let { name, request } = requestItem;
        // console.log("postman req: ", requestItem)
        let tcRequest = new requestImportModel_1.RequestImportModel();
        tcRequest.name = name;
        tcRequest.url = request.url.raw;
        tcRequest.method = request.method;
        if (request.header) {
            tcRequest.headers = [];
            for (let header of request.header) {
                tcRequest.headers.push({ name: header.key, value: header.value });
            }
        }
        if (request.body) {
            tcRequest.body = {};
            if (request.body.mode === "urlencoded") {
                tcRequest.body.form = [];
                tcRequest.body.type = "formencoded";
                for (let item of request.body.urlencoded) {
                    tcRequest.body.form.push({ name: item.key, value: item.value });
                }
            }
            else if (request.body.mode === "formdata") {
                tcRequest.body.form = [];
                tcRequest.body.type = "formdata";
                for (let item of request.body.formdata) {
                    tcRequest.body.form.push({ name: item.key, value: item.value });
                }
            }
            else if (request.body.mode === "raw") {
                if (request.body.options) {
                    tcRequest.body.type = request.body.options.raw.language;
                }
                tcRequest.body.raw = request.body.raw;
            }
            else if (request.body.mode === "graphql") {
                tcRequest.body.type = "graphql";
                tcRequest.body.graphql = request.body.graphql;
            }
            else {
                tcRequest.body = undefined;
            }
        }
        if (request.auth) {
            tcRequest.auth = { type: "none", basic: undefined, oauth2: undefined, bearer: undefined };
            let authType = request.auth.type;
            if (authType === "basic" && request.auth.basic) {
                let basic = request.auth.basic;
                var usernameItem = basic.find((st) => st.key == "username");
                var passwordItem = basic.find((st) => st.key == "password");
                if (usernameItem && passwordItem) {
                    tcRequest.auth.type = "basic";
                    tcRequest.auth.basic = { username: usernameItem.value, password: passwordItem.value };
                }
            }
            else if (authType === "bearer") {
                tcRequest.auth.type = "bearer";
                tcRequest.auth.bearer = (_a = request.auth.bearer[0]) === null || _a === void 0 ? void 0 : _a.value;
            }
            else if (authType === "oauth2") {
                // ref https://stackoverflow.com/a/24250926
                // use => {} as Oauth2 OR <OAuth2>{}
                var oauth = {};
                let oauth2Data = request.auth.oauth2;
                oauth.grantType = oauth2Data.find((st) => st.key == "grant_type").value;
                oauth.accessToken = oauth2Data.find((st) => st.key == "accessToken").value;
                oauth.state = oauth2Data.find((st) => st.key == "state").value;
                oauth.scope = oauth2Data.find((st) => st.key == "scope").value;
                oauth.clientId = oauth2Data.find((st) => st.key == "clientId").value;
                oauth.clientSecret = oauth2Data.find((st) => st.key == "clientSecret").value;
                oauth.tokenUrl = oauth2Data.find((st) => st.key == "accessTokenUrl").value;
                oauth.authUrl = oauth2Data.find((st) => st.key == "authUrl").value;
                if (oauth.grantType !== "authorization_code" && oauth.grantType !== "client_credentials") {
                    oauth = undefined;
                }
                if (oauth) {
                    tcRequest.auth.type = "oauth2";
                    tcRequest.auth.oauth2 = oauth;
                }
            }
        }
        return tcRequest;
    }
}
exports.default = PostmanImport;
