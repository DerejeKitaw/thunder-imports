import DataProvider from "./dataProvider";
import { CollectionImportModel } from "../models/collectionImportModel";
import { EnvironmentImportModel } from "..";

export default class ThunderImport implements DataProvider {
    isMatchCollection(json: any): boolean {
        if (json.client && json.client.includes("Thunder Client") && json.collectionName) {
            return true;
        }

        return false;
    }

    importCollection(json: any): CollectionImportModel {
        var data = new CollectionImportModel();
        data.name = json.collectionName;
        data.requests = json.requests;
        return data;
    }

    isMatchEnvironment(json: any): boolean {
        if (json.client && json.client.includes("Thunder Client") && json.environmentName) {
            return true;
        }

        return false;
    }

    importEnvironment(json: any): EnvironmentImportModel {
        var data = new EnvironmentImportModel();
        data.name = json.environmentName;
        data.variables = json.variables;
        return data;
    }
}