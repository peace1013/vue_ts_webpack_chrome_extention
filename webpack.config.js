const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    //background: path.join(__dirname, "src/background.ts"),
    main: path.join(__dirname, "src/index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        //vueのloader設定
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        //cssのloader設定
        test: /\.css$/,
        use:[
          "style-loader",
          "css-loader"
        ]
      },
    ],
  },
  resolve: {
    alias: {'vue$': 'vue/dist/vue.esm-bundler.js'},
    extensions: [".ts", ".js", ".vue", ".json"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { 
          from: ".", 
          to: "../",
          context: "public"
        }
      ]
    }),
    new VueLoaderPlugin()
  ],
  devtool: 'cheap-module-source-map',
  cache: true,
  watchOptions:{
    poll: true,
  }
};
