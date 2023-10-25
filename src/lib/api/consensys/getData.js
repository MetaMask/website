import axios from 'axios'
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
  getCommunityEvent: url => {
    return axios.get(url)
  },
}

export default consensysData
