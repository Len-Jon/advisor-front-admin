module.exports = {
    devServer: {
        port: 8080, // 源地址端口，自行修改
        proxy: {
            '/api': {
                target: 'http://47.100.90.111:8088/',  // 跨域目标主机，自行修改
                ws: true,  // 代理 websockets
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''  // 重写地址
                }
            },
        }
    }
};