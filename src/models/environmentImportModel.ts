import { KeyValue } from "./requestImportModel";

export class EnvironmentImportModel {
    /**
     * Environment Name
     */
    name: string = ""
    variables: KeyValue[] = [];
}