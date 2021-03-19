import DataProvider from "./providers/dataProvider";
import PostmanImport from "./providers/postmanImport";
import ThunderImport from "./providers/thunderImport";

export default class RegisterProviders {

    public static getProviders(): DataProvider[] {
        var providers: DataProvider[] = [];
        providers.push(new ThunderImport());
        providers.push(new PostmanImport());
        return providers;
    }
}