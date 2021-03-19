import { v4 as uuidv4 } from 'uuid';

export const defaultCollection = "history";

export type KeyValue = {
    name: string,
    value: string
}

export type BasicAuth = {
    username: string,
    password: string
}

export type OAuth2 = {
    accessToken: string,
    tokenName: string,
    grantType: "authorization_code" | "client_credentials",
    callbackUrl: string,
    authUrl: string,
    tokenUrl: string,
    clientId: string,
    clientSecret: string,
    scope: string,
    state: string
}

export type RequestBody = {
    type: "none" | "text" | "json" | "xml" | "formdata" | "formencoded" | "graphql",
    raw: string | undefined,
    form: KeyValue[] | undefined
}

export type Authentication = {
    type: "none" | "basic" | "bearer" | "oauth2",
    basic: BasicAuth | undefined,
    bearer: string | undefined,
    oauth2: OAuth2 | undefined
}

export class RequestModel {
    /**
     * Collection Name
     */
    public colName: string;

    /**
     * collection Id
     */
    public colId: string;
    public method: string = "";
    public url: string = "";
    public name: string = "";
    public id: string;
    public _id: string;
    public modified: string;
    public headers: KeyValue[] = [];
    public body: RequestBody | undefined;
    public auth: Authentication | undefined;
    public tests: any[] | undefined;

    setId(reqId: string) {
        this.id = this._id = reqId;
    }

    /**
     * request model object
     * @param url request url
     * @param method http method
     */
    public constructor() {
        this.colName = defaultCollection;
        this.colId = defaultCollection;
        this.modified = new Date().toISOString();
        let uid = uuidv4();
        this.id = this._id = uid;
    }
}