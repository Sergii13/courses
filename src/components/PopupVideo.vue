<template>
  <Teleport to="body">
    <Transition name="popup">
      <div
          v-if="props.isOpen"
          id="popup"
          aria-hidden="true"
          class="popup popup_show"
      >
        <div class="popup__overlay"></div>
        <div @click.self="popupClose" class="popup__wrapper">
          <div class="popup__content">
            <button @click="popupClose" class="popup__close">Close</button>
            <div v-if="props.lesson" class="popup__wrap">
              <div class="popup__title">
                {{ props.lesson.title }}
              </div>
              <div class="popup__lesson-number">
                Lesson number: {{ props.lesson.order }}
              </div>
              <div class="popup__lesson-video">
                <video @timeupdate="updateCurrentTime" controls ref="popupVideoSelector"
                       :poster="`${props.lesson.previewImageLink}/lesson-${lesson.order}.webp`">
                </video>
              </div>
              <div class="popup__info">
                <p> Increase the playback speed of the video press 'A' key</p>
                <p> Decrease the playback speed of the video press 'D' key</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import {ref, watch, nextTick, onMounted, onBeforeUnmount, onUnmounted, computed} from "vue";
import {videoHlsLoad, setPlaybackRate} from "@/helpers/video";
import {setItem, getItem} from "@/helpers/storage";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  lesson: {
    type: Object,
    required: true,
  }
})

const emits = defineEmits(['closePopup'])
const popupVideoSelector = ref(null)
const videoFromLocaleStorage = ref([])

const indexVideo = computed(() => {
  if (videoFromLocaleStorage.value && props.lesson) {
    return videoFromLocaleStorage.value.findIndex((item) => props.lesson.id === item.id);
  }
})
const popupOpen = () => {
  nextTick(() => {
    if (props.lesson && popupVideoSelector.value) {
      if (indexVideo.value !== -1) {
        popupVideoSelector.value.currentTime = videoFromLocaleStorage.value[indexVideo.value].currentTime;
      }
    }
  })
  document.documentElement.classList.add('popup-show')
}
const popupClose = () => {
  updateCurrentTime();
  if (props.lesson) {
    if (indexVideo.value !== -1) {
      videoFromLocaleStorage.value[indexVideo.value].currentTime = currentTime.value;
    } else {
      const videoInfo = {id: props.lesson.id, currentTime: currentTime.value};
      videoFromLocaleStorage.value.push(videoInfo);
    }
  }
  setItem('videos_course', videoFromLocaleStorage.value)
  document.documentElement.classList.remove('popup-show')
  emits('closePopup')
}


watch(() => props.isOpen, (newValue) => {
  if (newValue === true) {
    popupOpen()
  } else {
    popupClose()
  }
})
const currentTime = ref(0);
const updateCurrentTime = () => {
  if (popupVideoSelector.value) {
    currentTime.value = popupVideoSelector.value.currentTime;
  }
};

watch(() => props.lesson, (newValue) => {
  if (newValue) {
    nextTick(() => {
      videoHlsLoad(popupVideoSelector.value, props.lesson.link)
    })
  }
})
onMounted(() => {
  let courses = getItem('videos_course');
  document.addEventListener('keypress', (e) => {
    if (e.code === 'KeyA') {
      setPlaybackRate(popupVideoSelector.value, -1)
    } else if (e.code === 'KeyD') {
      setPlaybackRate(popupVideoSelector.value, 1)
    }
  })
  nextTick(() => {
    videoFromLocaleStorage.value = courses ? courses : [];
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('keypress', () => {
  })
})
</script>

<style lang="scss">
.popup-enter-from .popup__content,
.popup-leave-to .popup__content {
  visibility: hidden;
  transform: scale(0);
}

.popup-enter-to .popup__content,
.popup-leave-from .popup__content {
  visibility: visible;
  transform: scale(1);
}

.popup-leave-active .popup__content,
.popup-enter-active .popup__content {
  transition: transform 0.6s ease 0s;
}

.popup__info {
  margin-top: 10px;
}

.popup__overlay {
  content: '';
  background: rgba(0, 0, 0, 0.81);
  mix-blend-mode: normal;
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.8s ease 0s;
  pointer-events: none;
  z-index: 149;
}


.popup-show .popup__overlay {
  opacity: 1;
}

.popup-show {

}


.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: visibility 0.8s ease 0s;
  visibility: hidden;
  pointer-events: none;
}

.popup_show {
  z-index: 150;
  visibility: visible;
  overflow: auto;
  pointer-events: auto;
}

.popup__wrapper {
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100%;
  flex: 1 1 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup__content {
  width: 100%;
  max-width: 900px;
  display: flex;
  z-index: 155;
  flex-direction: column;
  padding: 50px 30px;
  background: #f8f8f8;
  color: var(--color-background);
  border-radius: 30px;
  position: relative;
  @media (max-width: 768px) {
    padding: 40px 10px;
  }

}

.popup {
  &__close {
    padding: 5px 15px;
    display: inline-block;
    border-radius: 12px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: var(--vt-c-indigo);
    color: #fff;
  }

  &__title {
    margin-bottom: 10px;
    font-size: 25px;
    font-weight: 500;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  &__lesson-number {
    margin-bottom: 20px;
    font-size: 20px;
    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  &__info {
    @media (max-width: 768px) {
      font-size: 10px;
    }
  }

  &__lesson-video {
    position: relative;
    width: 100%;
    padding-bottom: 60%;
    display: block;
    width: 100%;
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
</style>
