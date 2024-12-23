import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
router
  .group(() => {
    router.get('/', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().index(ctx)
    })

    router.get('/add-book', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().create(ctx)
    })

    router.post('/add-book', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().store(ctx)
    })

    router.get('/book/:id', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().show(ctx)
    })

    router.delete('/book/:id', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().destroy(ctx)
    })

    router.get('/edit/:id', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().edit(ctx)
    })

    router.put('/edit/:id', async (ctx) => {
      const { default: BooksController } = await import('#controllers/books_controller')
      return new BooksController().update(ctx)
    })
  })
  .use(middleware.auth())
