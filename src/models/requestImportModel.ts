import { v4 as uuidv4 } from 'uuid';

export type KeyValue = {
    name: string,
    value: string
}

export type BasicAuth = {
    username: string,
    password: string
}

export type GraphqlBody = {
    query: string,
    variables: string | undefined
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

export type BodyType = "none" | "text" | "json" | "xml" | "formdata" | "formencoded" | "graphql";

export type RequestBody = {
    type: BodyType,
    raw: string | undefined,
    form: KeyValue[] | undefined,
    files: string[] | undefined,
    graphql: GraphqlBody | undefined
}

export type Authentication = {
    type: "none" | "basic" | "bearer" | "oauth2",
    basic: BasicAuth | undefined,
    bearer: string | undefined,
    oauth2: OAuth2 | undefined
}

export class RequestImportModel {
    public containerId: string = "";
    public _id: string;
    public sortNum: number = 0;
    public method: string = "";
    public url: string = "";
    public name: string = "";
    public headers: KeyValue[] = [];
    public body: RequestBody | undefined;
    public auth: Authentication | undefined;
    public tests: any[] | undefined;

    public constructor() {
        this._id = uuidv4();
    }
}