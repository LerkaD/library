module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: { node: "current" },
                modules: "commonjs",         // for jasmine
            }
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            }
        ],
        "@babel/preset-typescript"
    ],
    plugins: [
    ]
};