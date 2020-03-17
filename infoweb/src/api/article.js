import request from '../utils/request'

export function sendInfo(data) {
    return request({
        url: '/upload/issue',
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

export function getAuList(data) {
    return request({
        url: '/user/my-article',
        method: 'post',
        data
    })
}

export function deleteArticle(data) {
    return request({
        url: '/user/delete-article',
        method: 'post',
        data
    })
}

export function editArticle(data) {
    return request({
        url: '/upload/edit-article',
        method: 'post',
        data
    })
}

export function detailsArticle(data) {
    return request({
        url: '/user/details-article',
        method: 'post',
        data
    })
}

export function remoteSearch(data) {
    return request({
        url: '/user/remote-search',
        method: 'post',
        data
    })
}

export function articleThumb(data) {
    return request({
        url: '/user/article-thumb-on',
        method: 'post',
        data
    })
}

export function comment(data) {
    return request({
        url: '/user/comment',
        method: 'post',
        data
    })
}

export function getComment(data) {
    return request({
        url: '/user/get-comment',
        method: 'post',
        data
    })
}

// export function upload(data, {headers}) {
//     return request({
//         url: '/upload/upload',
//         method: 'post',
//         data,
//         headers
//     })
// }

export function myself(data) {
    return request({
        url: '/upload/myself',
        method: 'post',
        data
    })
}

export function rate(data) {
    return request({
        url: '/user/rate',
        method: 'post',
        data
    })
}