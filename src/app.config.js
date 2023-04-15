const baseConfig = {
    appid: '',
    baseUrl: "http://39.98.48.25:8086", // 接口请求地址
}

uni.config = baseConfig;
//冻住config ，禁止修改
Object.freeze(uni.config)


