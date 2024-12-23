import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Role from '../../contract/Role.js'

export default class BookPolicy extends BasePolicy {
  viewList(): AuthorizerResponse {
    return true
  }

  view(): AuthorizerResponse {
    return true
  }

  create(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  edit(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  update(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }

  delete(user: User): AuthorizerResponse {
    return user.role === Role.ADMIN
  }
}
