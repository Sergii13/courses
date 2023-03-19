<template>
  <div class="course">
    <div class="container">
      <RouterLink :to="{name:'home'}" class="course__back">Back to Home</RouterLink>
      <ErrorsMessage v-if="error" :error="error"/>
      <SpinnerApp v-if="isLoading"/>
      <div v-if="data" class="course__content">
        <h2 class="course__title">
          {{ data.title }}
        </h2>
        <div class="course__video">
          <video controls ref="previewVideoCourse"
                 :poster="`${data.previewImageLink}/cover.webp`"></video>
        </div>
        <div class="course__description">
          {{ data.description }}
        </div>
        <div class="course__rating">
          Rating: 4.5
        </div>
        <div class="course__skills">
          <div class="course__skill-title">Skills:</div>
          <div class="course__skills-list">
          <span v-for="skill of data.meta.skills" :key="skill" class="course__skill">
         {{ skill }}
        </span>
          </div>
        </div>
        <div class="course__lessons-title">
          Lessons
        </div>
        <div class="course__lessons">
          <a @click.prevent="popupOpen(lesson)" v-for="lesson of data.lessons" :key="lesson.id"
             class="lesson"
             :class="{'locked':lesson.status==='locked'}">
            <div class="lesson__image-ibg">
              <span v-show="lesson.status==='locked'" class="lesson__locked">Lesson Locked</span>
              <img :src="`${lesson.previewImageLink}/lesson-${lesson.order}.webp`" alt="">
            </div>
            <h4 class="lesson__title">
              {{ lesson.title }}
            </h4>
          </a>
        </div>
        <PopupVideo @close-popup="popupClose" :lesson="currentLesson" :is-open="isPopupOpen"/>
      </div>

    </div>

  </div>
</template>
<script setup>
import {useCourseStore} from "@/stores/course";
import {storeToRefs} from "pinia";
import {computed, onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import SpinnerApp from "@/components/SpinnerApp.vue";
import {videoHlsLoad} from "@/helpers/video";
import PopupVideo from "@/components/PopupVideo.vue";
import ErrorsMessage from "@/components/ErrorsMessage.vue";


const route = useRoute()

const store = useCourseStore()
const {isLoading, error, data} = storeToRefs(store)

const previewVideoCourse = ref(null)
const previewCourseLinkVideo = computed(() => {
  if (data.value) {
    return data.value.meta.courseVideoPreview.link
  }
})

const currentLesson = ref(null)
const isPopupOpen = ref(false)
const popupOpen = (lesson) => {
  isPopupOpen.value = true;
  currentLesson.value = lesson

}
const popupClose = () => {
  currentLesson.value = null;
  isPopupOpen.value = false;
}

onMounted(() => {
  store.getCourse(route.params.id).then(() => {
    videoHlsLoad(previewVideoCourse.value, previewCourseLinkVideo.value)
  })
})
</script>
<style scoped lang="scss">
.course {

  &__back {
    text-decoration: underline;
    color: #fff;
    font-size: 20px;
    display: inline-block;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }

  &__title {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 35px;
    @media (max-width: 768px) {
      font-size: 24px;
      margin-bottom: 15px;
    }
  }

  &__description {
    font-size: 24px;
    margin-bottom: 15px;
    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 20px;
    }
  }

  &__rating {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  &__skills {
    display: flex;
    gap: 10px
  }

  &__skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    @media (max-width: 768px) {
      gap: 5px
    }
  }

  &__skill-title {
    font-size: 18px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 14px;
      margin-bottom: 10px;
    }
  }

  &__skill {
    display: inline-block;
    padding: 5px 15px;
    background: var(--vt-c-indigo);
    border-radius: 10px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  &__lessons-title {
    font-size: 20px;
    font-weight: 500;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  &__lessons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    @media (max-width: 991px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 450px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__video {
    position: relative;
    width: 100%;
    padding-bottom: 40%;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      padding-bottom: 70%;
    }

    video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}


.lesson {
  cursor: pointer;
  display: block;
  border: 1px solid var(--vt-c-indigo);
  border-radius: 10px;
  overflow: hidden;
  background: var(--vt-c-text-light-1);
  transition: all 0.3s cubic-bezier(.17, .67, .83, .67);

  &.locked {
    pointer-events: none;
    opacity: 0.7;
  }

  &:hover {
    box-shadow: 0px 0px 0px 2px var(--vt-c-indigo);
  }

  &__locked {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    color: #fff;
    font-size: 18px;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    height: 100%;
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

  &__title {
    font-weight: 500;
    padding: 15px 10px;
  }
}
</style>
