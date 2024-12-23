<script setup>
import { ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { IconSearch, IconXboxXFilled } from '@tabler/icons-vue'

const props = defineProps({
  currentPath: String,
  pathSearch: String,
  placeholder: String,
  search: String,
})

const search = ref(props.search || '')
const searchBook = () => {
  if (search.value) {
    router.get(props.pathSearch + search.value)
  }
}
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="w-2/4 relative">
      <input
        @keyup.enter.prevent="searchBook"
        v-model="search"
        type="text"
        class="w-full h-full bg-input rounded-lg px-5 py-2"
        :placeholder="placeholder"
      />
      <button
        type="button"
        class="absolute right-1 top-1 px-2 py-1 cursor-pointer hover:bg-primary rounded transition"
        @click="searchBook"
      >
        <IconSearch stroke="{2}" />
      </button>
      <button
        v-if="search"
        type="button"
        class="absolute right-12 top-2 px-2 cursor-pointer"
        @click="((search = ''), router.get(currentPath))"
      >
        <IconXboxXFilled class="text-zinc-600" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>
