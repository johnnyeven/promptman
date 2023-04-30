const path = require("path");

module.exports = {
    i18n: {
        locales: ["en", "zh-CN"],
        defaultLocale: "zh-CN",
        localeDetection: false,
    },
    localePath: path.resolve("./public/locales"),
    reloadOnPrerender: process.env.NODE_ENV == "development",
};