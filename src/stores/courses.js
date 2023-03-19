import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCourses as getCoursesApi } from '@/api/courses'

export const useCoursesStore = defineStore('courses', () => {
  const data = ref(null)
  const isLoading = ref(null)
  const error = ref(null)
  const getCourses = () => {
    return new Promise((resolve, reject) => {
      isLoading.value = true
      error.value = null
      data.value = null
      getCoursesApi()
        .then((response) => {
          isLoading.value = false
          data.value = response.courses
          resolve(response)
        })
        .catch((err) => {
          error.value = err.message
          isLoading.value = false
          reject(err)
        })
    })
  }
  return { data, error, isLoading, getCourses }
})
