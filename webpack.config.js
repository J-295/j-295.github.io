const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/pages/scarsz-bin.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        filename: "scarsz-bin.js",
        path: path.resolve(__dirname, "docs", "pages"),
    },
};
