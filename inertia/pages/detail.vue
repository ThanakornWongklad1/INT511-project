<script setup>
import { IconChevronLeft } from '@tabler/icons-vue'
import { ref } from 'vue'
import { router, usePage, Head } from '@inertiajs/vue3'
import ButtonComponent from '~/components/ButtonComponent.vue'

const props = defineProps({ book: Object, suggestBooks: Object, isBorrow: Boolean })
const page = usePage()

const seperateCategory = (category) => {
  return category.trim().split(',')
}

const borrowBook = () => {
  router.post(`/book/${props.book.id}`, {
    _token: page.props.csrf_token,
  })
}

const user = usePage().props.user
</script>

<template>
  <!-- content -->
  <Head :title="`หยิบยืม | ${book.title}`" />

  <div class="w-full flex flex-col gap-6 mt-10 px-32 pb-8 pt-5">
    <div class="w-full flex justify-between">
      <!-- image -->
      <div class="w-1/2 flex justify-center">
        <img :src="book.image" alt="book image" class="rounded-xl object-cover w-1/2" />
      </div>
      <!-- detail -->
      <div class="w-1/2 flex flex-col gap-5">
        <a href="/" class="flex gap-3 text-primary hover:text-secondary transition">
          <IconChevronLeft stroke="{2}" />
          <p>กลับหน้าหลัก</p>
        </a>
        <h1 class="text-3xl font-medium truncate">{{ book.title }}</h1>
        <p>ผู้เขียน : {{ book.author ? book.author : '-' }}</p>
        <p>เรื่องย่อ :</p>
        <p class="ml-5">{{ book.description }}</p>
        <div class="flex">
          <p>ประเภท :</p>
          <div class="" v-for="category in seperateCategory(book.category)">
            <p class="ml-2 bg-secondary px-2 rounded">{{ category }}</p>
          </div>
        </div>

        <p>จำนวนที่ยืมได้ : {{ book.quantity }}</p>
        <form @submit.prevent="borrowBook" v-if="user.role === 'USER'">
          <ButtonComponent
            :label="isBorrow ? 'คืนหนังสือ' : 'ยืมหนังสือ'"
            :isDisabled="book.quantity === 0"
          />
        </form>
        <a :href="`/edit/${book.id}`" v-else>
          <ButtonComponent label="แก้ไขหนังสือ" :isDisabled="book.quantity === 0" />
        </a>
      </div>
    </div>
    <p class="font-medium mb-6 text-center text-xl">หนังสือที่แนะนำ</p>
    <div
      class="flex flex-wrap gap-x-16 gap-y-6 mb-20 justify-center"
      v-if="suggestBooks.length !== 0"
    >
      <a
        :href="`/book/${book.id}`"
        v-for="book in suggestBooks"
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
      </a>
    </div>
  </div>
</template>

<style scoped></style>
