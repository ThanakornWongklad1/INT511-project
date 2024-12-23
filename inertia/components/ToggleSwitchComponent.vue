<script setup>
import { ref } from 'vue'
const props = defineProps({
  oneRoute: String,
  twoRoute: String,
  isActivate: Boolean,
  labelOne: String,
  labelTwo: String,
})
</script>

<template>
  <div class="w-full">
    <div class="flex justify-center" v-if="isActivate">
      <div class="w-[350px] rounded-xl bg-[#F1F5F9] py-1 px-1 flex gap-1 relative">
        <a :href="oneRoute" class="py-1.5 bg-white w-1/2 rounded-lg text-center shadow">{{
          labelOne
        }}</a>
        <a
          :href="twoRoute"
          class="py-1.5 w-1/2 rounded-lg text-center text-[#64748B] cursor-pointer"
          >{{ labelTwo }}</a
        >
      </div>
    </div>
    <div class="flex justify-center" v-else>
      <div class="w-[350px] rounded-xl bg-[#F1F5F9] py-1 px-1 flex gap-1 relative">
        <a
          :href="oneRoute"
          class="py-1.5 w-1/2 rounded-lg text-center text-[#64748B] cursor-pointer"
          >{{ labelOne }}</a
        >
        <a :href="twoRoute" class="py-1.5 bg-white w-1/2 rounded-lg text-center shadow">{{
          labelTwo
        }}</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
