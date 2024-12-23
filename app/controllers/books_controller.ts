import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { createBookValidator, updateBookValidator } from '#validators/book'
import Bookself from '#models/bookself'

export default class BooksController {
  async index({ inertia, request }: HttpContext) {
    const search = request.qs().search
    let books: Book[]
    if (search) {
      books = await Book.query()
        .where('title', 'like', `%${search}%`)
        .orWhere('author', 'like', `%${search}%`)
      return inertia.render('home', { books: books, searchValue: search })
    } else {
      books = await Book.query().where('quantity', '>', 0)
      const booksOut = await Book.query().where('quantity', '=', 0)
      books = books.concat(booksOut)
      return inertia.render('home', { books: books, searchValue: '' })
    }
  }

  async show({ auth, inertia, params }: HttpContext) {
    const user = auth.getUserOrFail()
    const bookId = params.id
    const book = await Book.query().where('id', bookId).first()
    const isBorrow = await Bookself.query()
      .where('book_id', bookId)
      .andWhere('user_id', user.id)
      .andWhere('status', 'borrow')
      .first()
    const suggestBooks = await Book.query()
      .where('id', '!=', bookId)
      .andWhere('quantity', '>', 0)
      .orderBy('quantity', 'desc')
      .limit(6)
    if (isBorrow) {
      return inertia.render('detail', { book: book, suggestBooks: suggestBooks, isBorrow: true })
    } else {
      return inertia.render('detail', { book: book, suggestBooks: suggestBooks, isBorrow: false })
    }
  }

  async edit({ bouncer, inertia, params }: HttpContext) {
    await bouncer.with('BookPolicy').authorize('edit')
    const book = await Book.query().where('id', params.id).first()
    return inertia.render('add-book', { edit: book, isEdit: true })
  }

  async update({ bouncer, inertia, request, response, params }: HttpContext) {
    try {
      await bouncer.with('BookPolicy').authorize('update')
      const payload = await request.validateUsing(updateBookValidator)
      const book = await Book.query().where('id', params.id).first()
      book!.title = payload.title
      book!.image = payload.image
      book!.author = payload.author
      book!.description = payload.description
      book!.quantity = payload.quantity
      book!.category = payload.category
      await book?.save()
      response.redirect().toRoute('/')
    } catch (error) {
      return inertia.render('add-book', {
        errors: error.messages,
        edit: request.only([
          'title',
          'image',
          'author',
          'description',
          'category',
          'quantity',
          'noti',
        ]),
        isEdit: true,
      })
    }
  }

  async create({ bouncer, inertia }: HttpContext) {
    await bouncer.with('BookPolicy').authorize('create')
    return inertia.render('add-book')
  }

  async store({ bouncer, inertia, request, response }: HttpContext) {
    try {
      await bouncer.with('BookPolicy').authorize('create')
      const payload = await request.validateUsing(createBookValidator)
      const book = new Book()
      book.title = payload.title
      book.image = payload.image
      book.author = payload.author
      book.description = payload.description
      book.quantity = payload.quantity
      book.category = payload.category
      await book.save()
      response.redirect().toRoute('/')
    } catch (error) {
      console.log(error.messages)
      return inertia.render('add-book', {
        errors: error.messages,
        edit: request.only([
          'title',
          'image',
          'author',
          'description',
          'category',
          'quantity',
          'noti',
        ]),
      })
    }
  }

  async destroy({ bouncer, response, params }: HttpContext) {
    await bouncer.with('BookPolicy').authorize('delete')
    const book = await Book.query().where('id', params.id).first()
    const bookSelf = await Bookself.query().where('book_id', params.id).first()
    await bookSelf?.delete()
    await book?.delete()
    response.redirect().toRoute('/')
  }
}
