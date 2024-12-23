import User from '#models/user'
import router from '@adonisjs/core/services/router'
import Role from '../../contract/Role.js'

router.on('/login').renderInertia('login').as('login')
router.post('/login', async (ctx) => {
  const { default: UserController } = await import('#controllers/users_controller')
  return new UserController().login(ctx)
})
router.get('/create_admin', async () => {
  const user = await User.create({ id: 1, username: 'admin', password: 'admin', role: Role.ADMIN })
  console.log(user.username + ' is created!')
})

router.on('/register').renderInertia('register').as('register')

router.post('/register', async (ctx) => {
  const { default: UserController } = await import('#controllers/users_controller')
  return new UserController().register(ctx)
})

router.get('/logout', async (ctx) => {
  const { default: UserController } = await import('#controllers/users_controller')
  return new UserController().logout(ctx)
})
