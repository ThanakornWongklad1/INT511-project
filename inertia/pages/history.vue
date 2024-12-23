<script setup>
import { ref } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'
import { DateTimeFormat, differenceTime } from '../../utils/DateTimeFormat'
import ToggleSwitchComponent from '~/components/ToggleSwitchComponent.vue'

const props = defineProps({ bookSelves: Object })

const formatStatus = (status) => {
  if (status === 'borrow') {
    return {
      text: 'ยืม',
      color: 'text-primary',
    }
  } else if (status === 'request') {
    return {
      text: 'รออนุมัติ',
      color: 'text-[#3367A1]',
    }
  } else if (status === 'return') {
    return {
      text: 'คืนแล้ว',
      color: 'text-[#4CAF50]',
    }
  }
}
</script>

<template>
  <Head :title="`หยิบยืม | ประวัติการยืม`" />

  <div class="w-full flex flex-col gap-10 px-32 pb-8">
    <!-- switch toggle -->
    <ToggleSwitchComponent
      :isActivate="false"
      oneRoute="/my-book"
      twoRoute="/history"
      labelOne="ยืม"
      labelTwo="ประวัติ"
    />
    <!-- content -->
    <div class="flex gap-10 flex-wrap" v-if="bookSelves.length !== 0">
      <div v-for="book in bookSelves" :key="book.id">
        <div class="flex gap-3">
          <img
            :src="book.image"
            alt="book image"
            class="rounded-xl object-cover w-[133.33px] h-[200px] relative transition group-hover:opacity-50"
          />
          <div class="flex flex-col justify-center">
            <a
              :href="`/book/${book.id}`"
              class="font-medium text-lg truncate w-[150px] hover:underline"
            >
              {{ book.title }}
            </a>
            <p class="truncate text-disabled w-[150px]">{{ book.author }}</p>
            <p>วันที่ยืม</p>
            <p class="truncate text-disabled w-[150px]">{{ DateTimeFormat(book.created_at) }}</p>
            <p>วันที่คืน</p>
            <p class="truncate text-disabled w-[150px]">
              {{ DateTimeFormat(book.deleted_at) }}
            </p>
            <p>สถานะ</p>
            <p class="truncate w-[150px]" :class="formatStatus(book.status).color">
              {{ formatStatus(book.status).text }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- no content -->
    <div v-else class="flex justify-center mt-52">
      <div class="flex flex-col justify-center h-full">
        <img src="../assets/mascot.svg" alt="not found mascot" class="w-40" />
        <p class="text-center text-2xl text-disabled mt-3">ไม่มีรายการ</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
