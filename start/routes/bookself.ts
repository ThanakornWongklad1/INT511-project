import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/book/:id', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().storeBookSelf(ctx)
    })

    router.delete('/my-book', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().deleteBookSelf(ctx)
    })

    router.get('/my-book', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().bookSelf(ctx)
    })

    router.get('/history', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().history(ctx)
    })

    router.get('/management', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().borrowAdmin(ctx)
    })

    router.get('/management/all', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().borrowAllAdmin(ctx)
    })

    router.put('/management/approve', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().approveRequest(ctx)
    })

    router.put('/management/canceled', async (ctx) => {
      const { default: BooksController } = await import('#controllers/bookselves_controller')
      return new BooksController().canceledBorrow(ctx)
    })
  })
  .use(middleware.auth())

// router.on('/history').renderInertia('history').use(middleware.auth())
