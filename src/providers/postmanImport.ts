import DataProvider from "./dataProvider";
import { CollectionImportModel } from "../models/collectionImportModel";
import { BodyType, KeyValue, OAuth2, RequestBody, RequestImportModel } from "../models/requestImportModel";
import { EnvironmentImportModel } from "..";

export default class PostmanImport implements DataProvider {
    isMatchEnvironment(json: any): boolean {
        if (json.name
            && json._postman_variable_scope === "environment"
            && json._postman_exported_using.includes("Postman")) {
            return true;
        }

        return false;
    }

    importEnvironment(json: any): EnvironmentImportModel {
        var data = new EnvironmentImportModel();
        data.name = json.name;

        let variables: KeyValue[] = [];
        for (const item of json.values) {
            variables.push({ name: item.key, value: item.value });
        }

        data.variables = variables;
        return data;
    }

    isMatchCollection(json: any): boolean {
        if (json.info && json.info.schema
            && json.info.schema.includes("postman")
            && json.info.schema.includes("v2.1.0")) {
            return true;
        }

        return false;
    }

    importCollection(json: any): CollectionImportModel {
        var data = new CollectionImportModel();
        data.name = json.info.name;

        var tcRequests: RequestImportModel[] = [];
        this.parseData(json, tcRequests);

        data.requests = tcRequests;
        return data;
    }

    private parseData(jsonData: any, tcRequests: RequestImportModel[]) {
        let item = jsonData.item;
        if (item && item.length > 0) {
            // console.log("postman collection: ", item)

            for (let colItem of item) {
                if (colItem.request) {
                    var req = this.parseRequest(colItem);
                    tcRequests.push(req);

                } else if (colItem.item) {

                    this.parseData(colItem, tcRequests);
                }
            }
        }
    }

    private parseRequest(requestItem: any) {
        let { name, request } = requestItem;
        // console.log("postman req: ", requestItem)
        let tcRequest = new RequestImportModel();

        tcRequest.name = name;
        tcRequest.url = request.url?.raw;
        // console.log("import reqname: ", name, tcRequest.url);
        tcRequest.method = request.method;
        if (request.header) {
            tcRequest.headers = [];
            for (let header of request.header) {
                tcRequest.headers.push({ name: header.key, value: header.value })
            }
        }

        if (request.body) {
            tcRequest.body = {} as RequestBody;
            if (request.body.mode === "urlencoded") {
                tcRequest.body.form = [];
                tcRequest.body.type = "formencoded";
                for (let item of request.body.urlencoded) {
                    tcRequest.body.form.push({ name: item.key, value: item.value })
                }
            } else if (request.body.mode === "formdata") {
                tcRequest.body.form = [];
                tcRequest.body.type = "formdata";
                for (let item of request.body.formdata) {
                    tcRequest.body.form.push({ name: item.key, value: item.value })
                }
            }
            else if (request.body.mode === "raw") {
                if (request.body.options) {
                    tcRequest.body.type = request.body.options.raw.language;
                } else {
                    tcRequest.body.type = this.getBodyTypeFromHeader(tcRequest.headers);
                }

                tcRequest.body.raw = request.body.raw;
            } else if (request.body.mode === "graphql") {
                tcRequest.body.type = "graphql";
                tcRequest.body.graphql = request.body.graphql;
            }
            else {
                tcRequest.body = undefined;
            }
        }

        if (request.auth) {
            tcRequest.auth = { type: "none", basic: undefined, oauth2: undefined, bearer: undefined }

            let authType = request.auth.type;
            if (authType === "basic" && request.auth.basic) {
                let basic = request.auth.basic;
                var usernameItem = basic.find((st: { key: string; }) => st.key == "username");
                var passwordItem = basic.find((st: { key: string; }) => st.key == "password");
                if (usernameItem && passwordItem) {
                    tcRequest.auth.type = "basic";
                    tcRequest.auth.basic = { username: usernameItem.value, password: passwordItem.value };
                }
            } else if (authType === "bearer") {
                tcRequest.auth.type = "bearer";
                tcRequest.auth.bearer = request.auth.bearer[0]?.value
            }
            else if (authType === "oauth2") {
                // ref https://stackoverflow.com/a/24250926
                // use => {} as Oauth2 OR <OAuth2>{}

                var oauth: OAuth2 | undefined = {} as OAuth2;
                let oauth2Data = request.auth.oauth2;

                oauth.grantType = oauth2Data.find((st: { key: string; }) => st.key == "grant_type").value;
                oauth.accessToken = oauth2Data.find((st: { key: string; }) => st.key == "accessToken").value;
                oauth.state = oauth2Data.find((st: { key: string; }) => st.key == "state").value;
                oauth.scope = oauth2Data.find((st: { key: string; }) => st.key == "scope").value;

                oauth.clientId = oauth2Data.find((st: { key: string; }) => st.key == "clientId").value;
                oauth.clientSecret = oauth2Data.find((st: { key: string; }) => st.key == "clientSecret").value;
                oauth.tokenUrl = oauth2Data.find((st: { key: string; }) => st.key == "accessTokenUrl").value;
                oauth.authUrl = oauth2Data.find((st: { key: string; }) => st.key == "authUrl").value;

                if (oauth.grantType !== "authorization_code" && oauth.grantType !== "client_credentials") {
                    oauth = undefined;
                }

                if (oauth) {
                    tcRequest.auth.type = "oauth2";
                    tcRequest.auth.oauth2 = oauth;
                }
            }
        }

        return tcRequest
    }

    private getBodyTypeFromHeader(headers: KeyValue[]) {
        let type: BodyType = "json"; // set default value

        var element = headers.find(s => s.name?.toLowerCase() == "content-type");
        if (!element) {
            return type;
        }

        var value = element.value;
        if (value.includes("text/plain")) {
            type = "text"
        }
        else if (value.includes("xml")) {
            type = "xml";
        }
        else if (value.includes("json")) {
            type = "json";
        }


        return type;
    }
}