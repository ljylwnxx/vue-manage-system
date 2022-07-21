import axios from 'axios'
import config from '../config/index'

//判断当前环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }
    getInsideConfig() {
        const config = {
            baseUrl: this.baseUrl,
            header: {}
        }
        return config
    }
    // 拦截器相关的函数
    interceptors(instance) {
        //请求拦截
        instance.interceptors.request.use(config => {
            //务必返回！
            //可以修改一些不符合服务器的要求内容
            //每次发送请求时 都希望再界面中显示一个请求图标
            //某些网络请求（比如登录token）,必须携带一些特殊的信息
            return config
        }, error => {
            return Promise.reject(error)
        })

        //响应拦截
        instance.interceptors.response.use(response => {
            return response//务必返回
        }, error => {
            return Promise.reject(error)
        })

    }

    request(options) {
        //创建axios实例
        const instance = axios.create()
        options = {
            ...this.getInsideConfig(), ...options
        }
        //请求和响应拦截器
        this.interceptors(instance)
        //发送真正的网络请求
        return instance(options)
    }
}
export default new HttpRequest(baseUrl)