import axios from 'axios'
import qs from 'qs'
import { CONSENSYS_HOST } from '../../config'

const axiosClient = axios.create({
  baseURL: CONSENSYS_HOST,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: {
    encode: qs.parse,
    serialize: qs.stringify,
  },
})
axiosClient.interceptors.request.use(async config => {
  return config
})
axiosClient.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }
    return response
  },
  error => {
    // Handle errors
    throw error
  }
)
export default axiosClient
