<template>
  <div class="pagination">
    <ul class="pagination__list">
      <li v-for="page of pagesNormalize" class="pagination__item">
        <a href="" @click.prevent="changePage(page)" class="pagination__link"
           :class="{'active':page===currentPageNormalize}">
          {{ page }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  pages: {
    type: Array,
    required: true,
  }
})
const emit = defineEmits(['changePage'])
const changePage = (page) => {
  emit('changePage', page - 1)
}

const pagesNormalize = computed(() => {
  return props.pages.map((item) => item + 1)
})
const currentPageNormalize = computed(() => {
  return props.currentPage + 1
})
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 30px;

  &__list {
    display: flex;
    justify-content: center;
    gap: 10px
  }

  &__item {
  }

  &__link {
    width: 30px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 1px solid var(--vt-c-indigo);

    &.active {
      background: var(--vt-c-indigo);
    }

    &:hover {
      box-shadow: 0px 0px 5px var(--vt-c-indigo);
    }
  }
}
</style>