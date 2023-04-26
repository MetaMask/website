import axiosClient from './axiosClient'

const consensysData = {
  getBlog: params => {
    const url = '/posts'
    return axiosClient.get(url, { params })
  },
  getToU: (pageId, params) => {
    const url = `/pages/${pageId}`
    return axiosClient.get(url, { params })
  },
}

export default consensysData
