<script setup>
import { ref, computed, watch } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'

import LoginLayout from '~/layouts/LoginLayout.vue'
import ButtonComponent from '~/components/ButtonComponent.vue'

defineOptions({ layout: LoginLayout })
const props = defineProps({
  errors: {
    type: Object,
    required: false,
  },
})

const page = usePage()

const registerInp = ref({
  username: '',
  password: '',
  confirmPassword: '',
})

const inputField = [
  {
    name: 'username',
    type: 'text',
    placeholder: 'รหัสนักศึกษา',
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'รหัสผ่าน',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'ยืนยันรหัสผ่าน',
  },
]

const errors = ref(props.errors)
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors || {}
  }
)

const register = () => {
  router.post('/register', {
    _token: page.props.csrf_token,
    ...registerInp.value,
  })
}
</script>

<template>
  <Head title="สมัครสมาชิก" />
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
          <a
            href="/login"
            class="text-white bg-black px-4 py-1.5 rounded-lg hover:scale-105 transition"
            >เข้าสู่ระบบ</a
          >
          <p class="my-auto px-4 py-1.5">สมัครสมาชิก</p>
        </div>
        <p class="text-4xl font-medium text-center">สมัครสมาชิก</p>
        <p class="text-center">ยินดีต้อนรับเข้าสู่ระบบหยิบยืมหนังสือออนไลน์</p>
        <form @submit.prevent="register" class="flex flex-col gap-3 px-32">
          <div v-for="field in inputField" class="w-full">
            <input
              v-model="registerInp[field.name]"
              :type="field.type"
              :placeholder="field.placeholder"
              class="px-3 py-3 bg-input rounded-lg w-full"
            />
            <div v-for="error in errors">
              <p v-if="error.field === field.name" class="text-red-500 text-sm pl-3">
                {{ error.message }}
              </p>
            </div>
          </div>
          <ButtonComponent
            label="สมัครสมาชิก"
            :isDisabled="
              !registerInp.username || !registerInp.password || !registerInp.confirmPassword
            "
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
