import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Role from '../../contract/Role.js'

export default class BookSelfPolicy extends BasePolicy {
  viewList(user: User): AuthorizerResponse {
    return user.role === Role.USER
  }

  viewManagement(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  create(user: User): AuthorizerResponse {
    return user.role === Role.USER
  }

  approve(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  deleteRequest(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  delete(user: User): AuthorizerResponse {
    return user.role === Role.USER
  }
}
