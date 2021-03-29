import { EnvironmentImportModel } from "..";
import { CollectionImportModel } from "../models/collectionImportModel";

export default interface DataProvider {
    isMatchCollection(json: any): boolean;
    importCollection(json: any): CollectionImportModel;
    isMatchEnvironment(json: any): boolean;
    importEnvironment(json: any): EnvironmentImportModel;
}