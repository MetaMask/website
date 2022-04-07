import axios from 'axios'
import queryString from 'query-string'
import {
  CONSENSYS_HOST
} from '../config'

export default async function(path, param, host = "https://content.consensys.net/wp-json/wp/v2") {
  const stringified = queryString.stringify(param);

  const res = await axios
    .get(`${host}${path}?${stringified}`)
    .catch(error => {
      throw error
    })
  if(res.status === 200) {
    return res.data
  }
  return res;
}
