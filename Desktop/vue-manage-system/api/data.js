import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        //传入相关配置和参数
        url: '/permission/getMenu',
        method: 'post',
        data: param
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'get'
    })
}
export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params

    })
}