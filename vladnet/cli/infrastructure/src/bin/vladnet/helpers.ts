import * as fs from "fs";
import * as path from "path";
import { ICLIConfig } from "../ICLIConfig";
import nativeRequire from "../../helpers/nativeRequire";
import { ICliAction } from "../../actions/ICLIAction";

export const normalizeActionPaths = (paths: string[]) => {
    return paths.map(value => {
        if (value.charAt(0) === ".") value = path.join(process.cwd(), value);
        return value;
    });
};

export const loadActions = (config: ICLIConfig) => {
    const absoluteActionPaths = normalizeActionPaths(config.actions);

    const actions = absoluteActionPaths.reduce((acc, actionPath) => {
        const loadedActions = nativeRequire(actionPath);
        Object
            .keys(loadedActions.actions)
            .forEach(key => {
                acc[key] = loadedActions.actions[key];
            });

        return acc;
    }, {} as { [key: string]: ICliAction });

    return actions;
}
