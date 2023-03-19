import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getOneCourse as getCourseApi } from '@/api/courses'

export const useCourseStore = defineStore('course', () => {
  const data = ref(null)
  const isLoading = ref(null)
  const error = ref(null)
  const getCourse = (id) => {
    return new Promise((resolve, reject) => {
      isLoading.value = true
      error.value = null
      data.value = null
      getCourseApi(id)
        .then((response) => {
          isLoading.value = false
          data.value = response
          resolve(response)
        })
        .catch((err) => {
          error.value = err.message
          isLoading.value = false
          reject(err)
        })
    })
  }
  return { data, error, isLoading, getCourse }
})
