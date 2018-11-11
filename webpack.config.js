const path = require("path");
const webpack = require("webpack");

const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackShellPlugin = require("webpack-shell-plugin");
const HistoryApiFallback = require("./webpack-serve/historyApiFallback");

const { config } = require("./config/build");

console.log("CONFIG = ", config); // eslint-disable-line

const DEV = process.env.NODE_ENV === "development";
const PROD = process.env.NODE_ENV === "production";

module.exports = {
  // Defaults to development, pass --mode production to override
  mode: "development",

  context: path.resolve(__dirname),

  target: "web",

  entry: {
    app: "./src/index.tsx"
  },

  output: {
    filename: "[name].[hash:7].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: config.url.publicPath
  },

  module: {
    rules: [
      // Vanilla CSS
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        loaders: ["style-loader", "css-loader"]
      },
      // PostCSS
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src"),
        loaders: [
          "style-loader",
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 }
          },
          "postcss-loader"
        ]
      },
      {
        test: /\.(jpg|png|gif|mp4|webm|mp3|ogg|svg)$/,
        loader: "file-loader",
        options: {
          name: "./f/[hash:16].[ext]"
        }
      },
      // Mostly for tests, but legacy JS in source too
      {
        test: /\.jsx?$/,
        exclude: /\/node_modules\//,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/proposal-object-rest-spread",
            ...(DEV ? ["react-hot-loader/babel"] : [])
          ],
          presets: ["@babel/env", "@babel/react"]
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /\/node_modules\//,
        loader: "babel-loader",
        options: {
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/proposal-object-rest-spread",
            ...(DEV ? ["react-hot-loader/babel"] : [])
          ],
          presets: ["@babel/env", "@babel/typescript", "@babel/react"]
        }
      }
    ]
  },

  plugins: [
    // Inject app config at build-time: see comments in config/index.ts for details
    new webpack.DefinePlugin({
      __WEBPACK_DEFINE_CONFIG_JS_OBJ__: JSON.stringify(config)
    }),
    new webpack.NamedModulesPlugin(),
    ...(DEV
      ? new WebpackShellPlugin({
          onBuildEnd: ["yarn --silent tsc:check:no-error --pretty"],
          dev: false
        })
      : []),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      favicon: "./src/static/favicon.ico"
    }),
    // Generate .gz for production builds
    // Consider adding brotli-webpack-plugin if your server supports .br
    ...(PROD
      ? [
          new CompressionPlugin({
            include: /\.(js|html|svg)$/
          })
        ]
      : [])
  ],

  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     vendors: {
    //       test: /\/node_modules\//,
    //       filename: "vendor.[hash:7].js",
    //       name: "vendor",
    //       chunks: "all"
    //     }
    //   }
    // }
  },

  // Using cheap-eval-source-map for build times
  // switch to inline-source-map if detailed debugging needed
  devtool: PROD ? false : "cheap-eval-source-map",

  serve: {
    add: app => {
      // historyApiFallback: required for redux-router to work on page refresh
      // a refresh on localhost:8080/counter will go to the counter component defined in the route
      app.use(HistoryApiFallback());
    },
    clipboard: false,
    hotClient: {
      logLevel: "warn"
    },
    devMiddleware: {
      publicPath: config.url.publicPath,
      stats: "minimal"
    }
  },

  externals: {
    cheerio: "window",
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".wasm"],
    modules: ["node_modules", path.resolve(__dirname, "src")],
    alias: {
      "@cfg": path.resolve(__dirname, "config"),
      "@src": path.resolve(__dirname, "src"),
      "@test": path.resolve(__dirname, "test")
    }
  }
};
