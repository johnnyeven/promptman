const path = require("path");

module.exports = {
    i18n: {
        locales: ["default", "en", "zh-CN"],
        defaultLocale: "default",
        localeDetection: false,
    },
    localePath: path.resolve("./public/locales"),
    reloadOnPrerender: process.env.NODE_ENV == "development",
};