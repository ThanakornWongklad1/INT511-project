// import Book from '#models/book'
import User from '#models/user'
import { registerUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async login({ auth, request, response, inertia }: HttpContext) {
    const { username, password } = request.only(['username', 'password'])
    console.log('login : ', username)
    let user: User | null = null
    try {
      user = await User.verifyCredentials(username, password)
      await auth.use('web').login(user)
      response.redirect().toRoute('/')
    } catch (error) {
      return inertia.render('login', {
        errors: 'Invalid username or password',
      })
    }
    response.redirect().toRoute('/')
  }

  async register({ request, response, inertia }: HttpContext) {
    console.log('register')
    console.log(request.all())
    try {
      const payload = await request.validateUsing(registerUserValidator)
      const user = new User()
      user.username = payload.username
      user.password = payload.password
      await user.save()
      response.redirect().toRoute('/login')
    } catch (error) {
      return inertia.render('register', {
        errors: error.messages,
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    response.redirect().toRoute('login')
  }
}
