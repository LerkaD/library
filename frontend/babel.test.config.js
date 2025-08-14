module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: { node: "current" }, // Для Node.js окружения
                modules: "commonjs",         // Важно для Jasmine
            }
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",        // Использует новый JSX-рантайм
            }
        ],
        "@babel/preset-typescript"
    ],
    plugins: [
    ]
};