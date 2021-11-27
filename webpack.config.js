// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const nodeExternals = require('webpack-node-externals');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';

const config = {
    //entry: './src/index.ts',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: "better-call-log.js"
    // },
    devtool: 'source-map',
    
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
            {
                test:/\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx','.ts','.js']
    }
};

const nodeConfig = {
    entry: './src/node.ts',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "better-call-log-node.js",
        libraryTarget: 'umd',
        libraryExport: 'default',
    }
};
const browserConfig = {
    entry: './src/browser.ts',
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "better-call-log-browser.js",
        libraryTarget: 'umd',
        libraryExport: 'default',
        globalObject: 'this',
        library: {
            name: 'BetterCall',
            type: 'umd',
            umdNamedDefine: true
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
      config.devtool = 'cheap-module-source-map';
    } else if (argv.mode === 'production') {
    } else {
      throw new Error('Specify env');
    }
  
    Object.assign(nodeConfig, config);
    Object.assign(browserConfig, config);
  
    return [nodeConfig, browserConfig];
  };
/*module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};*/
