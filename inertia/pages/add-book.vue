<script setup>
import { router, usePage, Head } from '@inertiajs/vue3'
import { ref, watch } from 'vue'
import { IconChevronLeft, IconPlus, IconMinus, IconBook, IconTrashXFilled } from '@tabler/icons-vue'

const props = defineProps({
  edit: {
    type: Object,
    required: false,
  },
  isEdit: {
    type: Boolean,
    required: false,
    default: false,
  },
  errors: {
    type: Object,
    required: false,
  },
})

const page = usePage()
const book = ref({
  title: props.edit?.title || '',
  image: props.edit?.image || '',
  author: props.edit?.author || '',
  description: props.edit?.description || '',
  category: props.edit?.category || '',
  quantity: props.edit?.quantity || 1,
  noti: props.edit?.noti || false,
})

const inputField = [
  {
    name: 'title',
    label: 'ชื่อหนังสือ',
    placeholder: 'ระบุชื่อหนังสือ',
  },
  {
    name: 'image',
    label: 'รูปปกหนังสือ',
    placeholder: 'ระบุ URL รูปปกหนังสือ',
  },
  {
    name: 'author',
    label: 'ผู้แต่ง',
    placeholder: 'ระบุชื่อผู้แต่ง',
  },
  {
    name: 'description',
    label: 'รายละเอียด',
    placeholder: 'ระบุชื่อรายละเอียด',
  },
  {
    name: 'category',
    label: 'ประเภท',
    placeholder: "เลือกประเภทหนังสือ (คั่นด้วย ',')",
  },
]

const addOrEdit = () => {
  if (!props.isEdit) {
    router.post('/add-book', {
      _token: page.props.csrf_token,
      ...book.value,
    })
  } else {
    router.put(`/edit/${props.edit.id}`, {
      _token: page.props.csrf_token,
      ...book.value,
    })
  }
}

const deleteBook = () => {
  console.log('Delete book:', props.edit.id)
  router.delete(`/book/${props.edit.id}`, {
    _token: page.props.csrf_token,
  })
}

const errors = ref(props.errors)
watch(
  () => props.errors,
  (newErrors) => {
    errors.value = newErrors || {}
    console.log('Errors received:', errors.value)
  }
)

const increaseAndDecrease = (type) => {
  if (type === '+') {
    book.value.quantity++
  } else {
    if (book.value.quantity > 1) {
      book.value.quantity--
    }
  }
}
</script>

<template>
  <Head title="หยิบยืม | เพิ่มหนังสือ" />

  <div class="w-full mt-10 px-32 pb-8 pt-5">
    <div class="w-full flex justify-center gap-10">
      <!-- image -->
      <div class="min-w-[50%] h-full flex justify-center flex-wrap">
        <div
          class="w-[479px] h-[600px] bg-input rounded-xl flex flex-col justify-center gap-2"
          v-if="!book.image"
        >
          <div class="flex justify-center">
            <IconBook stroke="{2}" size="50" class="text-disabled" />
          </div>
          <p class="text-center text-disabled">ระบุ URL รูปปกหนังสือ <br />เพื่อแสดงรูปภาพ</p>
        </div>
        <img :src="book.image" alt="book image" class="rounded-xl object-cover w-1/2" v-else />
      </div>

      <!-- form -->
      <div class="w-full">
        <div class="flex justify-between mb-5">
          <a href="/" class="flex gap-3 text-primary hover:text-secondary transition">
            <IconChevronLeft stroke="{2}" />
            <span>กลับหน้าหลัก</span>
          </a>
          <button
            @click.prevent="deleteBook"
            v-if="isEdit"
            class="flex gap-1 text-[#FF3535] hover:text-red-700 transition"
          >
            <IconTrashXFilled />
            <span>ลบหนังสือ</span>
          </button>
        </div>
        <form @submit.prevent="addOrEdit" class="flex flex-col gap-5">
          <div class="flex flex-col gap-y-5">
            <div v-for="input in inputField" class="grid grid-cols-10">
              <p class="col-span-2 mt-3">{{ input.label }}</p>
              <div class="col-span-8 flex flex-col">
                <input
                  v-if="input.name !== 'description'"
                  :name="input.name"
                  type="text"
                  class="w-full bg-input px-3 py-3 rounded-lg"
                  :placeholder="input.placeholder"
                  v-model="book[input.name]"
                />
                <textarea
                  v-else
                  class="bg-input px-3 py-3 rounded-lg"
                  rows="3"
                  name="description"
                  :placeholder="input.placeholder"
                  v-model="book[input.name]"
                ></textarea>
                <!-- error handle -->
                <div v-for="error in errors">
                  <p v-if="error.field === input.name" class="text-red-500 text-sm pl-3">
                    {{ error.message }}
                  </p>
                </div>
              </div>
            </div>
            <div class="grid grid-cols-10">
              <p class="col-span-2 mt-3">จำนวนหนังสือ</p>
              <div class="w-full col-span-8">
                <div class="flex gap-3 h-full">
                  <button
                    type="button"
                    class="h-full w-10 bg-primary rounded-lg"
                    @click="increaseAndDecrease('-')"
                  >
                    <IconMinus stroke="{2}" class="h-full mx-auto my-auto" />
                  </button>
                  <div
                    class="bg-input w-20 rounded-lg text-center flex flex-col py-3 justify-center"
                  >
                    {{ book.quantity }}
                  </div>
                  <button
                    type="button"
                    class="h-full w-10 bg-primary rounded-lg"
                    @click="increaseAndDecrease('+')"
                  >
                    <IconPlus stroke="{2}" class="h-full mx-auto my-auto" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full flex gap-4">
            <button type="submit" class="w-full bg-primary rounded-lg py-3">บันทึก</button>
            <a href="/" class="w-full text-center bg-disabled rounded-lg py-3">ยกเลิก</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
