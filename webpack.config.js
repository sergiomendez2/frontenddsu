const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry:'./src/index.js',
    output:{
        filename: "bundle.js",
        path:  path.resolve(__dirname, './dist'),
        publicPath: '',

    },
    mode:'none',
    module:{
     rules:[
         {
             test: /\.css$/,
             use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
     ]},
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles.css",
        }),
],
}