import { RequestImportModel } from "./requestImportModel";
import { v4 as uuidv4 } from 'uuid';

export class CollectionImportModel {
    /**
     * Collection Name
     */
    name: string = ""
    requests: RequestImportModel[] = []
    folders: FolderImportModel[] = [];
}

export class FolderImportModel {
    public containerId: string = "";
    public _id: string;
    public name: string;
    public sortNum: number = 0;

    public constructor(folderName: string, parentFolderId: string = "") {
        this.name = folderName;
        this._id = uuidv4();
        this.containerId = parentFolderId || "";
    }
}

