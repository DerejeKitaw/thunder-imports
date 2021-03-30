export declare const defaultCollection = "history";
export declare type KeyValue = {
    name: string;
    value: string;
};
export declare type BasicAuth = {
    username: string;
    password: string;
};
export declare type GraphqlBody = {
    query: string;
    variables: string | undefined;
};
export declare type OAuth2 = {
    accessToken: string;
    tokenName: string;
    grantType: "authorization_code" | "client_credentials";
    callbackUrl: string;
    authUrl: string;
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    scope: string;
    state: string;
};
export declare type RequestBody = {
    type: "none" | "text" | "json" | "xml" | "formdata" | "formencoded" | "graphql";
    raw: string | undefined;
    form: KeyValue[] | undefined;
    graphql: GraphqlBody | undefined;
};
export declare type Authentication = {
    type: "none" | "basic" | "bearer" | "oauth2";
    basic: BasicAuth | undefined;
    bearer: string | undefined;
    oauth2: OAuth2 | undefined;
};
export declare class RequestModel {
    /**
     * Collection Name
     */
    colName: string;
    /**
     * collection Id
     */
    colId: string;
    method: string;
    url: string;
    name: string;
    id: string;
    _id: string;
    modified: string;
    headers: KeyValue[];
    body: RequestBody | undefined;
    auth: Authentication | undefined;
    tests: any[] | undefined;
    setId(reqId: string): void;
    /**
     * request model object
     * @param url request url
     * @param method http method
     */
    constructor();
}
