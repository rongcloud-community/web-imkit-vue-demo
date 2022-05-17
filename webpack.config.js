const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: "assets/[hash][ext][query]",
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
      optionalChaining: false,
      templateLiteral: false,
    },
  },
  devServer: {
    static: "./dist",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            isCustomElement: (tag) =>
              ["conversation-list", "message-list", "message-editor"].includes(
                tag
              ),
          },
        },
      },

      // {
      //   test: /\.js$/,
      //   loader: "babel-loader",
      //   exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
      // },

      // {
      //   test: /\.ts$/,
      //   loader: "ts-loader",
      //   options: { appendTsSuffixTo: [/\.vue$/] },
      // },

      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"],
      },

      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
  ],
};
