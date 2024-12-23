<script setup>
import { ref } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'
import { differenceTime } from '../../utils/DateTimeFormat'
import ToggleSwitchComponent from '~/components/ToggleSwitchComponent.vue'

const page = usePage()

const props = defineProps({ bookSelves: Object })
console.log(props.bookSelves)

const removeBook = (bookId) => {
  console.log(bookId)
  router.delete(`/my-book`, {
    _token: page.props.csrf_token,
    data: {
      bookId,
    },
  })
}
</script>

<template>
  <Head :title="`หยิบยืม | ชั้นหนังสือ`" />

  <div class="w-full flex flex-col gap-10 px-32 pb-8">
    <!-- switch toggle -->
    <ToggleSwitchComponent
      :isActivate="true"
      oneRoute="/my-book"
      twoRoute="/history"
      labelOne="ยืม"
      labelTwo="ประวัติ"
    />
    <!-- content -->
    <div class="flex flex-wrap gap-x-16 gap-y-6 mb-20 w-full" v-if="bookSelves.length !== 0">
      <div class="w-[200px]" v-for="book in bookSelves" :key="book.id">
        <div class="relative group">
          <img
            :src="book.image"
            alt="book image"
            class="rounded-xl object-cover w-[200px] h-[300px] relative transition group-hover:opacity-50"
          />
          <form @submit.prevent="removeBook(book.id)">
            <button
              type="submit"
              class="absolute cursor-pointer top-1/2 left-2.5 text-white bg-black text-center py-1 px-20 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition duration-300"
            >
              คืน
            </button>
          </form>
        </div>
        <p class="font-medium text-lg truncate">{{ book.title }}</p>
        <p class="truncate text-disabled">{{ book.author }}</p>
        <span
          class="text-red-500 text-sm flex gap-1"
          v-if="differenceTime(new Date().toISOString(), book.schedule_at)"
        >
          <p v-if="differenceTime(new Date().toISOString(), book.schedule_at).days > 0">
            {{ differenceTime(new Date().toISOString(), book.schedule_at).days }} วัน
          </p>
          <p v-if="differenceTime(new Date().toISOString(), book.schedule_at).hours > 0">
            {{ differenceTime(new Date().toISOString(), book.schedule_at).hours }} ชั่วโมง
          </p>
          <p v-if="differenceTime(new Date().toISOString(), book.schedule_at).minutes > 0">
            {{ differenceTime(new Date().toISOString(), book.schedule_at).minutes }} นาที
          </p>
        </span>
        <p class="text-red-500 text-sm" v-else>เลยกำหนดการคืน</p>
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
