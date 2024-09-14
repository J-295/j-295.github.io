"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
exports.tests = {
    "Discord -> Minecraft chat": {
        "main channel name": (data) => {
            const mainChannel = Object.keys(data.yml.config["Channels"])[0];
            if (!mainChannel)
                return;
            if (data.plugins.includes("TownyChat")) {
                if (mainChannel !== "general")
                    return "<p>Due to TownyChat, your main channel should be \"general\".</p>";
            }
            else {
                if (mainChannel !== "global")
                    return "<p>Your main channel should be \"global\".</p>";
            }
        }
    }
};
