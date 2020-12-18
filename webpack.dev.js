const path = require("path");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/renderer",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "build", "renderer"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: { esmodules: "true" },
                  // useBuiltIns: "entry",
                  // corejs: { version: 3, proposals: true },
                },
              ],
              ["@babel/preset-react"],
            ],
          },
        },
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
      { test: /\.svg$/, use: ["@svgr/webpack", "url-loader"] },
    ],
  },
  resolve: {
    extensions: [".js"],
    // alias: {
    //   fs: path.resolve("fs"),
    //   path: path.resolve("path")
    // },
    // fallback: {
    //   "path": require.resolve("path-browserify"),
    //   "fs": require.resolve("fs")
    // },
  },
  target: [
    "node",
    "electron-main",
    "electron-preload",
    "electron-renderer",
  ],
};
