import instance from './axInstance'

export const getCollegeList = async () => {
  return instance.get('college')
}