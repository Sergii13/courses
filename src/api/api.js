import axios from 'axios'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkM2U4N2Q5MS0xNTg0LTQwYTgtODMxYy0yODc2MjhiY2ViYjYiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2NzkwNzUyNDMsImV4cCI6MTY3OTk3NTI0M30.M06YBMD7L0RUf_b3HK2vQGwQ0w98C6maH5eQmvE9m70'

axios.defaults.baseURL = 'https://api.wisey.app/api/v1/core/preview-courses'
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
export default axios
