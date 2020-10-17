module.exports = {
    devServer: {
        port: 8080, // 源地址端口，自行修改
        proxy: {
            '/api': {
                target: 'https://qingyou.njupt.edu.cn/mini_program/advicetoadvisor/',  // 跨域目标主机，自行修改
                ws: true,  // 代理 websockets
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''  // 重写地址
                },
                cookiePathRewrite: {//重写cookie路径
                    '/advicetoadvisor': '/'
                }
            }
        }
    }
};