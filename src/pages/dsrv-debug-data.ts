import { Bin } from "scarsz-bin";
import YAML from "yaml";

const ymlNames = ["alerts", "config", "linking", "messages", "synchronization", "voice"] as const;

export type DebugData = {
    bin: Bin;
    yml: { [K in typeof ymlNames[number]]: any };
    plugins: string[];
};

export function extractDebugData(bin: Bin): DebugData {
    const files = new Map(bin.files.map(f => [f.name, f.content]));
    
    const yml = {} as any;
    for (const name of ymlNames) {
        yml[name] = YAML.parse(files.get(`${name}.yml`)!.trimEnd());
    }

    const plugins = files.get("server-info.txt")!.match(/^server plugins: \[(.*)\]$/m)![1].split(", ").map(s => s.match(/^\S+/)![0]);

    return {
        bin,
        yml,
        plugins
    };
}
