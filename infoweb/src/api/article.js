import request from '../utils/request'

export function sendInfo(data) {
    return request({
        url: '/user/issue',
        method: 'post',
        data
    })
}

export function getAllList() {
    return request({
        url: '/user/all-article',
        method: 'get'
    })
}

export function getAuList(data) {
    return request({
        url: '/user/my-article',
        method: 'post',
        data
    })
}