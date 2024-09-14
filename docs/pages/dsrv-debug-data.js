"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDebugData = extractDebugData;
const yaml_1 = __importDefault(require("yaml"));
const ymlNames = ["alerts", "config", "linking", "messages", "synchronization", "voice"];
function extractDebugData(bin) {
    const files = new Map(bin.files.map(f => [f.name, f.content]));
    const yml = {};
    for (const name of ymlNames) {
        yml[name] = yaml_1.default.parse(files.get(`${name}.yml`).trimEnd());
    }
    const plugins = files.get("server-info.txt").match(/^server plugins: \[(.*)\]$/m)[1].split(", ").map(s => s.match(/^\S+/)[0]);
    return {
        bin,
        yml,
        plugins
    };
}
