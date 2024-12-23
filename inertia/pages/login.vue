<script setup>
import { ref, computed, watch } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'

import LoginLayout from '~/layouts/LoginLayout.vue'
import ButtonComponent from '~/components/ButtonComponent.vue'

defineOptions({ layout: LoginLayout })
const props = defineProps({
  errors: String,
})

const page = usePage()

const loginInp = ref({
  username: '',
  password: '',
})

const login = () => {
  router.post('/login', {
    _token: page.props.csrf_token,
    ...loginInp.value,
  })
}
</script>

<template>
  <Head title="เข้าสู่ระบบ" />
  <div class="w-full h-screen bg-[#F8F8F8] relative overflow-hidden px-56 py-28">
    <!-- content login -->
    <div class="bg-white shadow-xl h-full rounded-2xl px-20 py-10 flex justify-between">
      <!-- image -->
      <div class="w-1/2 flex flex-col justify-center">
        <div class="flex justify-center">
          <img src="../assets/mascotBook.svg" alt="mascot" class="w-[500px]" />
        </div>
      </div>
      <!-- form -->
      <div class="w-1/2 relative flex flex-col gap-6 justify-center">
        <!-- page route -->
        <div class="flex justify-end gap-4 text-center absolute top-0 right-0">
          <p class="my-auto px-4 py-1.5">เข้าสู่ระบบ</p>
          <a
            href="/register"
            class="text-white bg-black px-4 py-1.5 rounded-lg hover:scale-105 transition"
            >สมัครสมาชิก</a
          >
        </div>
        <p class="text-4xl font-medium text-center">เข้าสู่ระบบ</p>
        <p class="text-center">ยินดีต้อนรับเข้าสู่ระบบหยิบยืมหนังสือออนไลน์</p>
        <form @submit.prevent="login" class="flex flex-col gap-3 px-32">
          <input
            v-model="loginInp.username"
            type="text"
            placeholder="รหัสนักศึกษา"
            class="px-3 py-3 bg-input rounded-lg"
          />
          <input
            v-model="loginInp.password"
            type="password"
            placeholder="รหัสผ่าน"
            class="px-3 py-3 bg-input rounded-lg"
          />
          <p
            class="text-red-500 bg-red-50 border border-red-500 py-3 text-center rounded-lg text-sm"
            v-if="errors"
          >
            {{ errors }}
          </p>
          <ButtonComponent
            label="เข้าสู่ระบบ"
            :isDisabled="!loginInp.username || !loginInp.password"
          />
        </form>
        <p class="text-sm text-disabled text-center">
          อย่าลืม register ใน
          <span class="text-primary">LINE Official</span>
          เพื่อรับข่าวสารและการแจ้งเตือน
        </p>
      </div>
    </div>
    <!-- bg stle -->
    <div class="absolute -top-44 -right-44 w-96 h-96 rounded-full bg-secondary"></div>
    <div class="absolute -bottom-44 -left-44 w-96 h-96 rounded-full bg-secondary"></div>
  </div>
</template>

<style scoped></style>
