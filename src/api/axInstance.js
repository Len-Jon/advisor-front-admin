import axios from 'axios'

const instance = axios.create({
  baseURL: 'api/',
})

instance.interceptors.response.use(value => value.data)

export default instance