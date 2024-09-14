const path = require("path");

module.exports = {
    mode: "production",
    entry: {
        "scarsz-bin": "./src/pages/scarsz-bin.ts",
        "dsrv-debug": "./src/pages/dsrv-debug.ts"
    },
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
        filename: "[name].js",
        path: path.resolve(__dirname, "docs", "pages"),
    },
};
