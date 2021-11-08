import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/Planss/Load',
        method: 'get',
        params
    })
}

export function add(data) {
    return request({
        url: '/Planss/add',
        method: 'post',
        data
    })
}

export function update(data) {
    return request({
        url: '/Planss/update',
        method: 'post',
        data
    })
}

export function del(data) {
    return request({
        url: '/Planss/delete',
        method: 'post',
        data
    })
}

export function planLog(params) {
    return request({
        url: '/Planss/PlanLog',
        method: 'get',
        params
    })
}

export function exporPlanLog(params) {
    return request({
        url: '/Planss/exporPlanLog',
        method: 'get',
        params
    })
}