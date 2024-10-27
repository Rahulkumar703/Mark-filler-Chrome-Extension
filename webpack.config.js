const path = require('path');

module.exports = {
    entry: './src/popup.js', // Adjust this to your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // Output folder
    },
    mode: 'production', // Set mode to 'production' for final build or development for development build
    devtool: 'source-map', // Generate source map for debugging
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
};
