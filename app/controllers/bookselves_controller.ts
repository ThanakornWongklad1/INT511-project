import Book from '#models/book'
import Bookself from '#models/bookself'
import { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'

export default class BookselvesController {
  async bookSelf({ bouncer, auth, inertia }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('viewList')
    const user = auth.getUserOrFail()
    const bookSelves = await db
      .from('bookselves')
      .join('books', (query) => {
        query.on('books.id', '=', 'bookselves.book_id')
      })
      .select(
        'bookselves.id',
        'books.title',
        'books.image',
        'books.author',
        'bookselves.created_at',
        'bookselves.schedule_at'
      )
      .where('bookselves.user_id', user.id)
      .andWhere('bookselves.status', 'borrow')
    return inertia.render('my-book', { bookSelves: bookSelves })
  }

  async history({ bouncer, auth, inertia }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('viewList')
    const user = auth.getUserOrFail()
    const bookSelves = await db
      .from('bookselves')
      .join('books', (query) => {
        query.on('books.id', '=', 'bookselves.book_id')
      })
      .select(
        'books.id',
        'books.title',
        'books.image',
        'books.author',
        'bookselves.created_at',
        'bookselves.status',
        'bookselves.deleted_at'
      )
      .where('bookselves.user_id', user.id)
      .orderBy('bookselves.created_at', 'desc')
    return inertia.render('history', { bookSelves: bookSelves })
  }

  async storeBookSelf({ bouncer, auth, inertia, params, response }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('create')
    const user = auth.getUserOrFail()
    const bookId = params.id
    const book = await Book.query().where('id', bookId).first()
    const suggestBooks = await Book.query()
      .where('id', '!=', bookId)
      .andWhere('quantity', '>', 0)
      .orderBy('quantity', 'desc')
      .limit(6)
    const isBorrow = await Bookself.query()
      .where('book_id', bookId)
      .andWhere('user_id', user.id)
      .andWhere('status', 'borrow')
      .first()
    if (book) {
      if (isBorrow) {
        response.redirect().toRoute('/my-book')
      } else {
        const bookSelf = new Bookself()
        bookSelf.bookId = bookId
        bookSelf.userId = user.id
        bookSelf.status = 'borrow'
        bookSelf.scheduleAt = DateTime.local().plus({ days: 7 })
        await bookSelf.save()
        book.quantity -= 1
        await book.save()
        return inertia.render('detail', { book: book, suggestBooks: suggestBooks, isBorrow: true })
      }
    } else {
      response.notFound('Book not found')
    }
  }

  async deleteBookSelf({ bouncer, auth, inertia, request, response }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('delete')
    const user = auth.getUserOrFail()
    const bookSelfId = request.all().bookId
    const bookSelf = await Bookself.query()
      .where('id', bookSelfId)
      .andWhere('user_id', user.id)
      .first()
    if (bookSelf) {
      const book = await Book.query().where('id', bookSelf.bookId).first()
      bookSelf.status = 'request'
      bookSelf.deletedAt = DateTime.local()
      await bookSelf?.save()
      if (book) {
        book.quantity += 1
        await book.save()
      }
      const bookSelves = await Book.query()
        .rightJoin('bookselves', 'books.id', '=', 'bookselves.book_id')
        // .select('books.id', 'books.title', 'books.image', 'books.author', 'books.created_at')
        .where('bookselves.user_id', user.id)
        .andWhere('bookselves.status', 'borrow')
      return inertia.render('my-book', { bookSelves: bookSelves })
    } else {
      response.notFound('Book not found')
    }
  }

  async borrowAdmin({ bouncer, inertia, request, response }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('viewManagement')
    const search = request.qs().search
    let bookSelves: Book[]
    if (search) {
      bookSelves = await db
        .from('bookselves')
        .join('books', (query) => {
          query.on('books.id', '=', 'bookselves.book_id')
        })
        .join('users', (query) => {
          query.on('users.id', '=', 'bookselves.user_id')
        })
        .select(
          'bookselves.id',
          'books.title',
          'books.image',
          'books.author',
          'users.username',
          'bookselves.created_at',
          'bookselves.schedule_at',
          'bookselves.status'
        )
        .where('books.title', 'like', `%${search}%`)
        .orWhere('users.username', 'like', `%${search}%`)
        .andWhere('bookselves.status', 'request')
        .orderBy('bookselves.created_at', 'desc')
      return inertia.render('dashboard', { borrow: bookSelves, searchValue: search })
    } else {
      bookSelves = await db
        .from('bookselves')
        .join('books', (query) => {
          query.on('books.id', '=', 'bookselves.book_id')
        })
        .join('users', (query) => {
          query.on('users.id', '=', 'bookselves.user_id')
        })
        .select(
          'bookselves.id',
          'books.id as book_id',
          'books.title',
          'books.image',
          'books.author',
          'users.username',
          'bookselves.created_at',
          'bookselves.schedule_at',
          'bookselves.status'
        )
        .where('bookselves.status', 'request')
        .orderBy('bookselves.created_at', 'desc')
      return inertia.render('dashboard', { borrow: bookSelves, searchValue: '' })
    }
  }

  async borrowAllAdmin({ bouncer, inertia, request }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('viewManagement')
    const search = request.qs().search
    let bookSelves: Book[]
    if (search) {
      bookSelves = await db
        .from('bookselves')
        .join('books', (query) => {
          query.on('books.id', '=', 'bookselves.book_id')
        })
        .join('users', (query) => {
          query.on('users.id', '=', 'bookselves.user_id')
        })
        .select(
          'bookselves.id',
          'books.title',
          'books.image',
          'books.author',
          'users.username',
          'bookselves.created_at',
          'bookselves.schedule_at',
          'bookselves.status'
        )
        .where('books.title', 'like', `%${search}%`)
        .orWhere('users.username', 'like', `%${search}%`)
        .andWhere('bookselves.status', 'request')
        .orWhere('bookselves.status', 'borrow')
        .orderBy('bookselves.created_at', 'desc')
      return inertia.render('dashboardAll', { borrow: bookSelves, searchValue: search })
    } else {
      bookSelves = await db
        .from('bookselves')
        .join('books', (query) => {
          query.on('books.id', '=', 'bookselves.book_id')
        })
        .join('users', (query) => {
          query.on('users.id', '=', 'bookselves.user_id')
        })
        .select(
          'bookselves.id',
          'books.id as book_id',
          'books.title',
          'books.image',
          'books.author',
          'users.username',
          'bookselves.created_at',
          'bookselves.schedule_at',
          'bookselves.status'
        )
        .where('bookselves.status', 'request')
        .orWhere('bookselves.status', 'borrow')
        .orderBy('bookselves.created_at', 'desc')
      return inertia.render('dashboardAll', { borrow: bookSelves, searchValue: '' })
    }
  }

  async approveRequest({ bouncer, request, response }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('approve')
    const bookSelfId = request.all().bookId
    const bookSelf = await Bookself.query().where('id', bookSelfId).first()
    if (bookSelf) {
      bookSelf.status = 'return'
      await bookSelf.save()
      return response.redirect().toRoute('/management')
    } else {
      response.notFound('Book not found')
    }
  }

  async canceledBorrow({ bouncer, request, response }: HttpContext) {
    await bouncer.with('BookSelfPolicy').authorize('deleteRequest')
    const bookSelfId = request.all().bookId
    const bookSelf = await Bookself.query().where('id', bookSelfId).first()
    if (bookSelf) {
      await bookSelf.delete()
      return response.redirect().toRoute('/management/all')
    } else {
      response.notFound('Book not found')
    }
  }
}
