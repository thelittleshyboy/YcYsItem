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
