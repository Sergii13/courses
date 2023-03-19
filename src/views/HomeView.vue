<template>
  <div class="courses">
    <div class="container">
      <h2 class="courses__title">All Courses</h2>
      <ErrorsMessage v-if="error" :error="error"/>
      <SpinnerApp v-if="isLoading"/>
      <div v-if="data" class="courses__wrap">
        <div class="courses__grid-layout">
          <div v-for="course of pages[currentPage]" :key="course.id" class="courses__card card-courses">
            <RouterLink :to="{name:'course', params:{id:course.id}}" class="card-courses__image-ibg">
              <img :src="`${course.previewImageLink}/cover.webp`" alt="Image"/>
            </RouterLink>
            <div class="card-courses__content">
              <RouterLink :to="{name:'course',params:{id:course.id}}" class="card-courses__title"> {{
                  course.title
                }}
              </RouterLink>
              <div class="card-courses__count">Count of lesson: {{ course.lessonsCount }}</div>
              <div class="card-courses__rating">Rating: {{ course.rating }}</div>
              <p class="card-courses__skills-title">
                Skills:
              </p>
              <ul class="card-courses__skills">
                <li v-for="skill of course.meta.skills">{{ skill }}</li>
              </ul>
            </div>
          </div>
        </div>
        <PaginationApp v-if="pages.length>0" @change-page="changePage" :current-page="currentPage"
                       :pages="paginationPages"/>
      </div>

    </div>
  </div>
</template>
<script setup>
import {computed, onMounted, ref} from 'vue'
import {useCoursesStore} from '@/stores/courses'
import {storeToRefs} from 'pinia'
import {arrChunk} from "@/helpers/chunk";
import SpinnerApp from "@/components/SpinnerApp.vue";
import PaginationApp from "@/components/PaginationApp.vue";
import ErrorsMessage from "@/components/ErrorsMessage.vue";

const store = useCoursesStore()

const {error, data, isLoading} = storeToRefs(store)
const currentPage = ref(0)
const pages = computed(() => {
  if (data.value) {
    return arrChunk(data.value)
  } else return null;
})

const paginationPages = computed(() => {
  return pages.value.map((item, index) => index)
})
const changePage = (newPage) => {
  currentPage.value = newPage
  window.scrollTo({top: 0, behavior: 'smooth'});
}
onMounted(() => {
  store.getCourses()
})
</script>

<style lang="scss" scoped>.courses {
  &__title {
    text-align: center;
    margin-bottom: 50px;
    font-size: 40px;
    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }

  &__grid-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
    @media (max-width: 991px) {
      gap: 20px
    }
  }

  &__card {
    flex-shrink: 0;
    width: calc(33.33% - 20px);
    @media (max-width: 991px) {
      width: calc(50% - 10px);
    }
    @media (max-width: 550px) {
      width: 100%;
    }
  }
}


.card-courses {
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--vt-c-indigo);
  transition: all 0.3s cubic-bezier(.17, .67, .83, .67);

  &:hover {
    box-shadow: 0px 0px 0px 2px var(--vt-c-indigo);
  }

  &__skills-title {
    margin-bottom: 5px;
    font-weight: 500;
  }

  &__image-ibg {
    position: relative;
    padding-bottom: 50%;
    display: block;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__content {
    padding: 20px;
  }

  &__title {
    font-size: 20px;
    align-self: auto;
    font-weight: 500;
    margin-bottom: 15px;
    display: inline-block;
    transition: all 0.3s cubic-bezier(.17, .67, .83, .67);
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 10px;
    }

    &:hover {
      color: var(--vt-c-indigo);
    }
  }

  &__count {
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 18px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  &__skills {
    display: grid;
    gap: 5px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__rating {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}</style>
