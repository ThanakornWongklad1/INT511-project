<script setup>
import { IconSearch, IconUser, IconLogout } from '@tabler/icons-vue'
import { router, usePage } from '@inertiajs/vue3'
import Role from '../../contract/Role'

const currentUrl = usePage().url
const user = usePage().props.user
</script>

<template>
  <div class="sticky top-0 bg-white z-50 w-full px-32 pt-5">
    <div class="w-full pb-6 flex justify-between">
      <a href="/" class="text-3xl font-medium my-auto hover:text-primary transition">หยิบยืม</a>
      <div class="flex justify-center gap-6">
        <a
          href="/"
          class="my-auto hover:text-primary hover:border-b border-primary transition"
          :class="{ 'text-primary border-b border-primary': currentUrl === '/' }"
        >
          หน้าหลัก
        </a>
        <a
          href="/my-book"
          class="my-auto hover:text-primary hover:border-b border-primary transition"
          :class="{
            'text-primary border-b border-primary':
              currentUrl === '/my-book' || currentUrl === '/history',
          }"
          v-if="user.role === Role.USER"
        >
          ชั้นหนังสือของฉัน
        </a>
        <a
          href="/add-book"
          class="my-auto hover:text-primary hover:border-b border-primary transition"
          :class="{ 'text-primary border-b border-primary': currentUrl === '/add-book' }"
          v-if="user.role === Role.ADMIN"
        >
          เพิ่มหนังสือ
        </a>
        <a
          href="/management"
          class="my-auto hover:text-primary hover:border-b border-primary transition"
          :class="{
            'text-primary border-b border-primary':
              currentUrl === '/management' || currentUrl === '/management/all',
          }"
          v-if="user.role === Role.ADMIN"
        >
          จัดการการคืน
        </a>
      </div>
      <div class="flex gap-5">
        <p class="my-auto truncate">{{ user?.username }}</p>
        <div
          class="w-10 h-10 rounded-full bg-primary hover:bg-black transition cursor-pointer group"
        >
          <IconUser stroke="{2}" class="mx-auto h-full my-auto group-hover:hidden" />
          <IconLogout
            @click.prevent="router.visit('/logout')"
            stroke="{3}"
            class="mx-auto h-full my-auto hidden group-hover:block"
            color="white"
          />
        </div>
      </div>
    </div>
  </div>
  <slot />
</template>
