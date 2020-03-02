import request from '../utils/request'

export function topicManage(data) {
    return request({
        url: '/user/topic-manage',
        method: 'post',
        data
    })
}

export function addTopic(data) {
    return request({
        url: '/user/add-topic',
        method: 'post',
        data
    })
}

export function remoteSearch(data) {
  return request({
      url: '/user/remote-topic',
      method: 'post',
      data
  })
}

export function newTopic() {
  return request({
      url: '/user/new-topic',
      method: 'get'
  })
}
