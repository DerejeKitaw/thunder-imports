import { CollectionImportModel } from "./models/collectionImportModel";
import { EnvironmentImportModel } from ".";
export declare class ImportProcessor {
    private _imports;
    constructor();
    private findMatchCollection;
    private findMatchEnvironment;
    importCollection(json: any): CollectionImportModel | undefined;
    importEnvironemnt(json: any): EnvironmentImportModel | undefined;
}
