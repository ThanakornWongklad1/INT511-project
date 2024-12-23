import vine from '@vinejs/vine'

const schemaCreate = vine.object({
  title: vine.string().unique(async (db, value) => {
    const book = await db.from('books').where('title', value).first()
    return !book
  }),
  image: vine
    .string()
    .maxLength(255)
    .url()
    .unique(async (db, value) => {
      const book = await db.from('books').where('image', value).first()
      return !book
    }),
  author: vine.string(),
  description: vine.string().maxLength(500),
  category: vine.string(),
  quantity: vine.number(),
})

const schemaUpdate = vine.object({
  title: vine.string(),
  image: vine.string().maxLength(255).url(),
  author: vine.string(),
  description: vine.string().maxLength(500),
  category: vine.string(),
  quantity: vine.number(),
})

export const createBookValidator = vine.compile(schemaCreate)
export const updateBookValidator = vine.compile(schemaUpdate)
