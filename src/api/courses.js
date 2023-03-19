import axios from '@/api/api'

const getCourses = () => {
  return axios.get().then((response) => response.data)
}
const getOneCourse = (id) => {
  return axios.get(id).then((response) => response.data)
}
export { getCourses, getOneCourse }
