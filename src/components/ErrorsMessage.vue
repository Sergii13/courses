<template>
  <div class="error">
    {{ error }}
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: String,
    required: false,
  }
})
</script>

<style lang="scss" scoped>
.error {
  font-size: 20px;
  color: red;
  text-align: center;
  margin-bottom: 20px;
}
</style>