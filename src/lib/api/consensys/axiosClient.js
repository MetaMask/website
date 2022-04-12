import axios from 'axios'
import queryString from 'query-string'
import {
  CONSENSYS_HOST,
} from '../../config';

const axiosClient = axios.create({
  baseURL: CONSENSYS_HOST,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
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
