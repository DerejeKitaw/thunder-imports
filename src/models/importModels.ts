import { KeyValue, RequestModel } from "./requestModel";

export class CollectionImportModel {
    /**
     * Collection Name
     */
    name: string = ""
    requests: RequestModel[] = []
}

export class EnvironmentImportModel {
    /**
     * Environment Name
     */
    name: string = ""
    variables: KeyValue[] = [];
}