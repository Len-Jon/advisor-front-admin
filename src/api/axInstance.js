import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://47.100.90.111:8088/',
})

instance.interceptors.response.use(value => value.data)

export default instance