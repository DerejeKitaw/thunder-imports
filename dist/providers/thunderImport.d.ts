import DataProvider from "./dataProvider";
import { CollectionImportModel } from "../models/collectionImportModel";
import { EnvironmentImportModel } from "..";
export default class ThunderImport implements DataProvider {
    isMatchCollection(json: any): boolean;
    importCollection(json: any): CollectionImportModel;
    isMatchEnvironment(json: any): boolean;
    importEnvironment(json: any): EnvironmentImportModel;
}
