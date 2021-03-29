export const defaultCollection = "history";

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

export type RequestBody = {
    type: "none" | "text" | "json" | "xml" | "formdata" | "formencoded" | "graphql",
    raw: string | undefined,
    form: KeyValue[] | undefined,
    graphql: GraphqlBody | undefined
}

export type Authentication = {
    type: "none" | "basic" | "bearer" | "oauth2",
    basic: BasicAuth | undefined,
    bearer: string | undefined,
    oauth2: OAuth2 | undefined
}

export class RequestImportModel {
    public method: string = "";
    public url: string = "";
    public name: string = "";
    public headers: KeyValue[] = [];
    public body: RequestBody | undefined;
    public auth: Authentication | undefined;
    public tests: any[] | undefined;
}