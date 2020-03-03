import request from '../utils/request'

export function getLogIn(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getAllList(data) {
    return request({
        url: '/user/all-article',
        method: 'post',
        data
    })
}