<script setup>
import { IconRosetteDiscountCheckFilled } from '@tabler/icons-vue'
import { router, Head } from '@inertiajs/vue3'
import { ref } from 'vue'
import SearchComponent from '~/components/SearchComponent.vue'

const props = defineProps({ books: Object, searchValue: String })
</script>

<template>
  <Head title="หยิบยืม" />
  <div class="w-full flex flex-col gap-6 px-32 pb-8">
    <!-- search bar -->
    <SearchComponent
      currentPath="/"
      pathSearch="/?search="
      placeholder="ค้นหาหนังสือ, ผู้แต่ง"
      :search="props.searchValue || ''"
    />
    <!-- announce -->
    <!-- <div class="bg-primary w-full rounded-3xl flex justify-between px-24 h-96">
      <div class="flex flex-col justify-center gap-3">
        <div class="flex gap-3">
          <img src="../assets/shield-check.svg" alt="verify account icon" width="40px" />
          <p class="text-[40px] font-medium">Register LINE Official</p>
        </div>
        <p class="">
          เพิ่มเพื่อนใน LINE Official เพื่อติดตามข่าวสาร<br />การแจ้งเตือนและสถานะการจองของคุณง่ายๆ<br />
          แค่ 3 ขั้นตอน
        </p>
      </div>
      <div class="flex gap-10 mr-10">
        <div class="flex flex-col gap-2 justify-center w-56 text-center">
          <img src="../assets/ScanQR.svg" alt="LINE QrCode" class="mx-auto w-40" />
          <p>
            แสกน LINE QR Code<br />
            เพื่อเพิ่มเพื่อน
          </p>
          <p class="bg-black text-white rounded-full w-6 h-6 mx-auto">1</p>
        </div>
        <div class="flex flex-col gap-2 justify-center w-56 text-center">
          <img src="../assets/LineCover.svg" alt="LINE Cover image" class="mx-auto w-40" />
          <p>เพิ่มเพื่อน <br />LINE Official</p>
          <p class="bg-black text-white rounded-full w-6 h-6 mx-auto">2</p>
        </div>
        <div class="flex flex-col gap-2 justify-center w-56 text-center">
          <img src="../assets/lineChat.svg" alt="LINE Chat" class="mx-auto w-40" />
          <p>ลงทะเบียนพิมพ์ regis ตามด้วยรหัสนักศึกษา 11 หลัก</p>
          <p class="bg-black text-white rounded-full w-6 h-6 mx-auto">3</p>
        </div>
      </div>
    </div> -->

    <!-- content -->
    <div class="w-full">
      <p class="font-medium mb-6 text-center text-xl">หนังสือทั้งหมด</p>
      <div class="flex flex-wrap gap-x-16 gap-y-6 mb-20 justify-center" v-if="books.length !== 0">
        <a
          :href="`book/${book.id}`"
          v-for="book in books"
          :key="book.id"
          class="hover:scale-105 transition relative w-[200px]"
          :class="book.quantity === 0 ? 'text-disabled' : ''"
        >
          <img
            :src="book.image"
            alt="book image"
            class="rounded-xl object-cover w-[200px] h-[300px]"
            :class="book.quantity === 0 ? 'opacity-50' : ''"
          />
          <p class="font-medium text-lg truncate">{{ book.title }}</p>
          <p class="truncate">{{ book.author }}</p>
          <p class="text-sm">จำนวน {{ book.quantity }}</p>
          <div
            class="absolute top-0 w-[200px] h-[300px] flex flex-col justify-center"
            v-if="book.quantity === 0"
          >
            <div class="flex justify-center">
              <p
                class="font-medium h-[33px] w-[111px] bg-primary rounded-full items-center text-center flex flex-col justify-center text-black"
              >
                หมด
              </p>
            </div>
          </div>
        </a>
      </div>
      <div v-else class="flex justify-center">
        <div class="flex flex-col justify-center">
          <img src="../assets/mascot.svg" alt="not found mascot" class="w-40" />
          <p class="text-center text-2xl text-disabled mt-3">ไม่พบหนังสือ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
