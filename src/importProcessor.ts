import DataProvider from "./providers/dataProvider";
import { CollectionImportModel } from "./models/collectionImportModel";
import RegisterProviders from "./registerProviders";
import { EnvironmentImportModel } from ".";

export class ImportProcessor {
    private _imports: DataProvider[];

    constructor() {
        this._imports = RegisterProviders.getProviders();
    }

    private findMatchCollection(json: any): DataProvider | undefined {
        for (const item of this._imports) {
            if (item.isMatchCollection(json)) {
                return item;
            }
        }

        return undefined;
    }

    private findMatchEnvironment(json: any): DataProvider | undefined {
        for (const item of this._imports) {
            if (item.isMatchEnvironment(json)) {
                return item;
            }
        }

        return undefined;
    }

    importCollection(json: any): CollectionImportModel | undefined {
        var match = this.findMatchCollection(json);
        if (!match) {
            return undefined;
        }

        return match.importCollection(json);
    }

    importEnvironemnt(json: any): EnvironmentImportModel | undefined {
        var match = this.findMatchEnvironment(json);
        if (!match) {
            return undefined;
        }

        return match.importEnvironment(json);
    }
}