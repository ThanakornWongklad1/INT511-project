<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: String,
  isDisabled: Boolean,
  type: {
    type: String,
    default: 'submit',
  },
})
</script>

<template>
  <div class="w-full">
    <button
      :disabled="isDisabled"
      :type="type"
      class="w-full text-center py-3 bg-primary hover:bg-black hover:text-white transition rounded-lg disabled:opacity-50 disabled:bg-primary disabled:text-black disabled:cursor-not-allowed"
    >
      {{ label }}
    </button>
  </div>
</template>

<style scoped></style>
