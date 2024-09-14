import { DebugData } from "./dsrv-debug-data";

type DebugTest = (data: DebugData) => string | void;

export const tests: Record<string, Record<string, DebugTest>> = {
    "Discord -> Minecraft chat": {
        "main channel name": (data) => {
            const mainChannel = Object.keys(data.yml.config["Channels"])[0];
            if (!mainChannel) return;
            if (data.plugins.includes("TownyChat")) {
                if (mainChannel !== "general") return "<p>Due to TownyChat, your main channel should be \"general\".</p>";
            } else {
                if (mainChannel !== "global") return "<p>Your main channel should be \"global\".</p>";
            }
        }
    }
};
