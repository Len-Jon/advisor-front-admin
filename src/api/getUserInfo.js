import instance from './axInstance'

export const getUserInfo = (form) => {
  return instance.post('login', form)
}