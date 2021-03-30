import DataProvider from "./dataProvider";
import { CollectionImportModel } from "../models/collectionImportModel";
import { EnvironmentImportModel } from "..";
export default class PostmanImport implements DataProvider {
    isMatchEnvironment(json: any): boolean;
    importEnvironment(json: any): EnvironmentImportModel;
    isMatchCollection(json: any): boolean;
    importCollection(json: any): CollectionImportModel;
    private parseData;
    private parseRequest;
}
