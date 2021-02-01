const config = {
    app: {
        name: "示例项目",
        desc: "demo management system",
        icon: "yunyingguanli",
        mainlayout: "portal",
    },
    models: {
        // dev: 'http://kjxx.cnovit.com/demo/',
        // dev: 'http://192.168.13.41:11002/demo/',
        dev: 'http://192.168.7.13:11006/demo',
        pro: '../',
    },
    uris: {
        auth: 'auth/',
        demo: '',
    }
}

window.config = config;
console.info("原始配置", config);

