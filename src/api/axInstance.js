import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://47.99.205.75:8086/',
})

instance.interceptors.response.use(value => value.data)

export default instance