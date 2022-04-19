const webpack = require('webpack')

export default (config, env, helpers, options) => {
    config.output.publicPath = process.env.URL_PATH
    config.plugins.push(
        new webpack.DefinePlugin({
            'ENV_API_URL': JSON.stringify(process.env.API_URL)
        })
    )
}