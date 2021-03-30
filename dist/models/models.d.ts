import { KeyValue, RequestModel } from "../models/requestModel";
export declare class CollectionImportModel {
    /**
     * Collection Name
     */
    name: string;
    requests: RequestModel[];
}
export declare class EnvironmentImportModel {
    /**
     * Environment Name
     */
    name: string;
    variables: KeyValue[];
}
