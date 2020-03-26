import request from '../utils/request'

export function userManage(data) {
    return request({
        url: '/user/user-manage',
        method: 'post',
        data
    })
}

export function userDelete(data) {
    return request({
        url: '/user/user-delete',
        method: 'post',
        data
    })
}


export function blogStatistics() {
    return request({
        url: '/user/blog-statistics',
        method: 'get'
    })
}

export function numStatistics() {
    return request({
        url: '/user/num-statistics',
        method: 'get'
    })
}
