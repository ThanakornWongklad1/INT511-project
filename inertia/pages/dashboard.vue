<script setup>
import { ref } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'
import { DateTimeFormat } from '../../utils/DateTimeFormat'
import SearchComponent from '~/components/SearchComponent.vue'
import ToggleSwitchComponent from '~/components/ToggleSwitchComponent.vue'

const page = usePage()

const props = defineProps({
  borrow: Object,
  searchValue: String,
})

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

const approveBorrow = (bookId) => {
  router.put(`/management/approve`, {
    _token: page.props.csrf_token,
    bookId: bookId,
  })
}
</script>

<template>
  <Head :title="`หยิบยืม | จัดการการคืน`" />
  <div class="w-full flex flex-col gap-5 px-32 mb-20">
    <SearchComponent
      placeholder="ค้นหาหนังสือ, รหัสนักศึกษาผู้ยืม"
      currentPath="/management"
      pathSearch="/management/?search="
      :search="props.searchValue || ''"
    />
    <!-- switch toggle -->
    <ToggleSwitchComponent
      :isActivate="true"
      oneRoute="/management"
      twoRoute="/management/all"
      labelOne="คำขอคืน"
      labelTwo="ทั้งหมด"
    />
    <!-- content -->
    <!-- header table -->
    <div class="grid grid-cols-8 text-sub-text">
      <p class="truncate text-center">ลำดับ</p>
      <p class="truncate col-span-2">หนังสือ</p>
      <p class="truncate">รหัสนักศึกษาผู้ยืม</p>
      <p class="truncate">วันที่ยืม</p>
      <p class="truncate">กำหนดการคืน</p>
      <p class="truncate">สถานะ</p>
      <p class="truncate text-center">คืนหนังสือ</p>
    </div>
    <hr />
    <!-- content -->
    <div v-for="(item, index) in borrow" :key="item.id" v-if="borrow.length !== 0">
      <div class="grid grid-cols-8">
        <p class="my-auto text-center">{{ index + 1 }}</p>
        <div class="my-auto col-span-2 flex gap-2 overflow-hidden mr-5 truncate">
          <img
            :src="item.image"
            alt="book image"
            class="rounded-xl object-cover h-[64px] w-[45px] relative transition group-hover:opacity-50"
          />
          <div class="flex flex-col justify-center">
            <a :href="`/book/${item.book_id}`" class="truncate hover:underline cursor-pointer">{{
              item.title
            }}</a>
            <p class="truncate text-disabled text-xs">{{ item.author }}</p>
          </div>
        </div>
        <p class="my-auto truncate">{{ item.username }}</p>
        <p class="my-auto truncate">{{ DateTimeFormat(item.created_at) }}</p>
        <p class="my-auto truncate">{{ DateTimeFormat(item.schedule_at) }}</p>
        <p class="my-auto truncate" :class="formatStatus(item.status).color">
          {{ formatStatus(item.status).text }}
        </p>
        <div class="flex justify-center">
          <button
            @click.prevent="approveBorrow(item.id)"
            class="bg-black text-white text-center my-auto py-1 rounded-lg hover:bg-primary hover:text-black transition w-1/2"
          >
            อนุมัติ
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center mt-44">
      <div class="flex flex-col justify-center">
        <img src="../assets/mascot.svg" alt="not found mascot" class="w-40" />
        <p class="text-center text-2xl text-disabled mt-3">ไม่พบรายการ</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
