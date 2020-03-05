import request from '../utils/request'

export function loginUser(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function logoutUser(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}

export function registerUser(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function allUser(data) {
  return request({
    url: '/user/all-user',
    method: 'post',
    data
  })
}

export function picUpload(data) {
  return request({
    url: '/user/pic-upload',
    method: 'post',
    data
  })
}
